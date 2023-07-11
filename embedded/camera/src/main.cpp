// aquadynamics/embedded/camera

#include <Arduino.h>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>

#include "esp_camera.h"
#include "camera_pins.h"

#define CAMERA_MODEL_AI_THINKER

WiFiMulti WiFiMulti;
SocketIOclient socketIO;

// network credentials
const char *ssid = "AquaDynamics";
const char *password = "AquaDynamics";

// socket.io parameters
const char *socket_io_host = "wss://aquadynamics-core.onrender.com";
const int socket_io_port = 443;

void socket_io_event(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case sIOtype_DISCONNECT:
    Serial.printf("[IOc] Disconnected!\n");
    break;
  case sIOtype_CONNECT:
    Serial.printf("[IOc] Socket.io connected! Data: %s\n", payload);

    // join default namespace (no auto join in socket.io v3)
    socketIO.send(sIOtype_CONNECT, "/");
    break;
  case sIOtype_EVENT:
  {
    char *sptr = NULL;

    int id = strtol((char *)payload, &sptr, 10);
    Serial.printf("[IOc] get event: %s id: %d\n", payload, id);

    if (id)
    {
      payload = (uint8_t *)sptr;
    }

    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, payload, length);

    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.c_str());
      return;
    }

    String eventName = doc[0];

    Serial.printf("[IOc] event name: %s\n", eventName.c_str());

    if (id)
    {
      DynamicJsonDocument docOut(1024);
      JsonArray array = docOut.to<JsonArray>();

      JsonObject parameters = array.createNestedObject();
      parameters["timestamp"] = millis();

      String output;
      output += id;
      serializeJson(docOut, output);

      // send event
      socketIO.send(sIOtype_ACK, output);
    }
  }
  break;
  case sIOtype_ACK:
    Serial.printf("[IOc] get ack: %u\n", length);
    break;
  case sIOtype_ERROR:
    Serial.printf("[IOc] get error: %u\n", length);
    break;
  case sIOtype_BINARY_EVENT:
    Serial.printf("[IOc] get binary: %u\n", length);
    break;
  case sIOtype_BINARY_ACK:
    Serial.printf("[IOc] get binary ack: %u\n", length);
    break;
  }
}

camera_config_t setup_camera()
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
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;

  config.xclk_freq_hz = 10000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_SVGA;
  config.jpeg_quality = 40;
  config.fb_count = 2;

  return config;
}

void setup()
{
  camera_config_t config = setup_camera();

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK)
  {
    return;
  }

  sensor_t *s = esp_camera_sensor_get();

  s->set_contrast(s, 0);
  s->set_raw_gma(s, 1);
  s->set_vflip(s, 1);

  Serial.begin(115200);

  WiFiMulti.addAP(ssid, password);
  Serial.printf("[SETUP] Connecting to %s...", ssid);

  while (WiFiMulti.run() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(100);
  }

  String ip = WiFi.localIP().toString();
  Serial.printf("\n[SETUP] WiFi connected successfully! IP: %s\n", ip.c_str());

  // begins the socket.io client with the given credentials
  socketIO.begin(socket_io_host, socket_io_port);

  // event handler
  socketIO.onEvent(socket_io_event);
}

void loop()
{
  socketIO.loop();

  camera_fb_t *fb = esp_camera_fb_get();
  if (!fb)
  {
    esp_camera_fb_return(fb);
    return;
  }

  socketIO.sendBIN((uint8_t)1, fb->buf, fb->len);
  esp_camera_fb_return(fb);

  // creat JSON message for Socket.IO (event)
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  // add event name
  array.add("camera");

  // add payload (parameters) for the event
  JsonObject parameters = array.createNestedObject();

  // serializes the json document to a string
  String output;
  serializeJson(doc, output);

  // send event
  socketIO.sendEVENT(output);

  // print json for debugging
  Serial.println(output);
}
