#include <WiFi.h>
#include <WiFiMulti.h>

#include <string.h>

#include "esp_camera.h"
#include "camera_pins.h"

#include "socket_io_binary_client.h"

const char *ssid = "AquaDynamics";
const char *password = "DynamicsAqua";
const char *aquarium_id = "";

const char *socket_io_host = "aquadynamics-core.onrender.com";
const int socket_io_port = 443;
const char *socket_io_url = "/socket.io/?EIO=4";

WiFiMulti WiFiMulti;

char binary_lead_frame[100];

SocketIoBinaryClient io;

void socket_io_event(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case sIOtype_DISCONNECT:
    Serial.printf("[IO] Disconnected!\n");
    break;
  case sIOtype_CONNECT:
    Serial.printf("[IO] Connected WebSocket server: %s:%d%s\n", socket_io_host, socket_io_port, payload);

    io.send(sIOtype_CONNECT, "/");
    break;
  }
}

// custom method to initialize and modify binary_lead_frame
void initialize_binary_lead_frame(char *binary_lead_frame)
{
  strcpy(binary_lead_frame, "451-[\"aquarium_camera_frame\",{\"frame\":{\"_placeholder\":true,\"num\":0},\"aquariumId\":\"");
  strcat(binary_lead_frame, aquarium_id);
  strcat(binary_lead_frame, "\"}]");
}

void setupLedFlash(int pin);

void setup_camera()
{
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.frame_size = FRAMESIZE_SXGA;
  config.pixel_format = PIXFORMAT_JPEG; // for streaming
  // config.pixel_format = PIXFORMAT_RGB565; // for face detection/recognition
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  // if PSRAM IC present, init with USXGA resolution and higher JPEG quality
  //                      for larger pre-allocated frame buffer.
  if (config.pixel_format == PIXFORMAT_JPEG)
  {
    if (psramFound())
    {
      config.jpeg_quality = 10;
      config.fb_count = 2;
      config.grab_mode = CAMERA_GRAB_LATEST;
    }
    else
    {
      // Limit the frame size when PSRAM is not available
      config.frame_size = FRAMESIZE_SXGA;
      config.fb_location = CAMERA_FB_IN_DRAM;
    }
  }
  else
  {
    // Best option for face detection/recognition
    config.frame_size = FRAMESIZE_240X240;
  }

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK)
  {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  sensor_t *s = esp_camera_sensor_get();
  // initial sensors are flipped vertically and colors are a bit saturated
  if (s->id.PID == OV3660_PID)
  {
    s->set_vflip(s, 1);       // flip it back
    s->set_brightness(s, 1);  // up the brightness just a bit
    s->set_saturation(s, -2); // lower the saturation
  }
  // drop down frame size for higher initial frame rate
  if (config.pixel_format == PIXFORMAT_JPEG)
  {
    s->set_framesize(s, FRAMESIZE_QVGA);
  }

#if defined(LED_GPIO_NUM)
  setupLedFlash(LED_GPIO_NUM);
#endif
}

void setup()
{
  initialize_binary_lead_frame(binary_lead_frame);

  Serial.begin(115200);

  setup_camera();

  WiFi.begin(ssid, password);
  WiFi.setSleep(false);

  Serial.printf("Connecting to: %s...", ssid);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.printf("\nWiFi connected successfully!");

  String ip = WiFi.localIP().toString();
  Serial.printf("\nIPv4: %s\nMAC Address: %s\n", ip.c_str(), WiFi.macAddress().c_str());

  io.beginSSL(socket_io_host, socket_io_port, socket_io_url);

  io.onEvent(socket_io_event);
}

void send_frame_via_websocket()
{
  camera_fb_t *fb = esp_camera_fb_get();
  if (!fb)
  {
    esp_camera_fb_return(fb);
    return;
  }

  io.send_binary(fb->buf, fb->len, binary_lead_frame);

  esp_camera_fb_return(fb);
}

void loop()
{
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Reconnecting WiFi...");
    WiFi.disconnect();
    WiFi.reconnect();
    delay(1000);
    return;
  }

  io.loop();
  send_frame_via_websocket();
}
