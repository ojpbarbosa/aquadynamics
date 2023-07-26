// aquadynamics/embedded/lightning

#include <Arduino.h>
#include <SPI.h>
#include "RTClib.h"

#define RELAY_PIN 2 // relay pin definition

#define BUTTON_PIN 3 // button pin definition

#define GREEN_LED_PIN 4 // green LED pin definition
#define RED_LED_PIN 5   // red LED pin definition

#define LDR_PIN A0 // LDR pin definition

// RTC object initialization
RTC_DS1307 rtc;

const int LDR_THRESHOLD = 384;

const int LIGHTNING_START_HOUR = 8;
const int LIGHTNING_START_MINUTE = 0;
const int LIGHTNING_END_HOUR = 17;
const int LIGHTNING_END_MINUTE = 0;

bool button_override = false; // button lightning override flag
enum LightningMode
{
  AUTO,
  MANUAL
};
LightningMode lightning_mode = AUTO; // lightning mode flag

String to_string(int number)
{
  return number < 10 ? "0" + String(number) : String(number);
}

void log(String label, String message)
{
  // get the current timestamp
  DateTime timestamp = rtc.now();

  // format the current date
  String day = to_string(timestamp.day());
  String month = to_string(timestamp.month());
  String date = day + "/" + month + "/" + String(timestamp.year());

  // format the current time
  String hour = to_string(timestamp.hour());
  String minute = to_string(timestamp.minute());
  String second = to_string(timestamp.second());
  String time = hour + ":" + minute + ":" + second;

  // print the current date to the serial monitor
  Serial.print("[" + label + "]");
  Serial.print(" Date: ");
  Serial.print(date);
  // print the current time to the serial monitor
  Serial.print(" | Time: ");
  Serial.print(time);
  Serial.print(" | ");
  Serial.println(message);
}

// method to hard reset the relay in order to fix mechanical issues
void hard_reset_relay(int attempt, bool (*is_lightning_wrong)())
{
  log("WARNING", "Event: Hard reset relay | Attempt: " + String(attempt));

  // hard reset the relay - turn it off and then on
  digitalWrite(RELAY_PIN, LOW);
  delay(1000);

  if (!is_lightning_wrong())
    return;

  digitalWrite(RELAY_PIN, HIGH);
  delay(1000);
}

bool is_lightning_off()
{
  return analogRead(LDR_PIN) >= LDR_THRESHOLD;
}

bool is_lightning_on()
{
  return analogRead(LDR_PIN) < LDR_THRESHOLD;
}

// method to verify if the relay is in its wrong state and fix its mechanical issues
void verify_mechanical_relay_issues(bool (*is_lightning_wrong)())
{
  delay(50); // debounce delay before checking if the lightning is wrong

  // if relay is in its wrong state
  if (is_lightning_wrong())
  {
    // print the event to the serial monitor
    log("WARNING", "Event: Start relay hard reset");

    int reset_attempt = 1;

    // while the relay is in its incorrect state
    while (is_lightning_wrong())
    {
      // hard reset the relay in order to fix mechanical issues
      hard_reset_relay(reset_attempt++, is_lightning_wrong);

      // debounce delay before verifying if the
      // lightning is wrong and hard reseting again
      delay(50);
    }

    // print the event to the serial monitor
    log("WARNING", "Event: End relay hard reset");
  }
}

bool is_lightning_time()
{
  // get the current timestamp
  DateTime timestamp = rtc.now();

  int hour = timestamp.hour();
  int minute = timestamp.minute();

  int current_time = hour * 60 + minute;

  int lightning_start_time = LIGHTNING_START_HOUR * 60 + LIGHTNING_START_MINUTE;
  int lightning_end_time = LIGHTNING_END_HOUR * 60 + LIGHTNING_END_MINUTE;

  return current_time >= lightning_start_time && current_time <= lightning_end_time;
}

void setup()
{
  pinMode(RELAY_PIN, OUTPUT);
  // turn off relay by default
  digitalWrite(RELAY_PIN, HIGH);

  // initialize RTC
  rtc.begin();

  if (!rtc.isrunning())
    // set the time to the compile time, if the RTC is not running yet
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));

  pinMode(BUTTON_PIN, INPUT);

  pinMode(GREEN_LED_PIN, OUTPUT);
  // turn on green LED by default
  digitalWrite(GREEN_LED_PIN, HIGH);

  pinMode(RED_LED_PIN, OUTPUT);
  // turn off red LED by default
  digitalWrite(RED_LED_PIN, LOW);

  // initialize serial communication
  Serial.begin(9600);
}

void loop()
{
  // if it is lightning time and there is no button override
  if (is_lightning_time() && !button_override)
  {
    // turn on relay by turning the pin low
    digitalWrite(RELAY_PIN, LOW);

    verify_mechanical_relay_issues(is_lightning_off);
  }

  else if (!button_override)
  {
    // turn off relay by turning the pin high
    digitalWrite(RELAY_PIN, HIGH);

    verify_mechanical_relay_issues(is_lightning_on);
  }

  // if the button is pressed
  if (digitalRead(BUTTON_PIN))
  {
    // toggle the relay
    digitalWrite(RELAY_PIN, !digitalRead(RELAY_PIN));

    // set the button override flag
    button_override = !button_override;

    // turn off green LED by turning the pin high
    digitalWrite(GREEN_LED_PIN, !digitalRead(GREEN_LED_PIN));

    // turn on red LED by turning the pin low
    digitalWrite(RED_LED_PIN, !digitalRead(RED_LED_PIN));

    // set the mode flag
    lightning_mode = button_override ? MANUAL : AUTO;

    // print the button override message
    log("WARNING", "Event: Button override");
  }

  String relay_state = digitalRead(RELAY_PIN) ? "Off" : "On";

  log("LOG", "Relay state: " + relay_state + " | Mode: " + (lightning_mode == AUTO ? "Auto" : "Manual"));

  // wait for 950 milliseconds (the remaining 50 milliseconds are used for the delay deboucing)
  delay(950);
}
