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

const int LDR_THRESHOLD = 384; // LDR threshold value

const int LIGHTNING_START_HOUR = 8;   // start hour for lightning
const int LIGHTNING_START_MINUTE = 0; // start minute for lightning
const int LIGHTNING_END_HOUR = 16;    // end hour for lightning
const int LIGHTNING_END_MINUTE = 0;   // end minute for lightning

bool button_override = false; // button lightning override flag
String mode = "Auto";         // mode flag

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
void hard_reset_relay(int attempt)
{
  log("WARNING", "Event: Hard reset relay | Attempt: " + String(attempt));

  // hard reset the relay - turn it off and then on
  digitalWrite(RELAY_PIN, LOW);
  delay(1000);
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
  // if relay is in its wrong state
  if (is_lightning_wrong())
  {
    // print the event to the serial monitor
    log("WARNING", "Event: Start relay hard reset");

    int reset_attempt = 1;

    // while the relay is in its incorrect state
    while (is_lightning_wrong())
      // hard reset the relay in order to fix mechanical issues
      hard_reset_relay(reset_attempt++);

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
  // set relay pin as output
  pinMode(RELAY_PIN, OUTPUT);
  // turn off relay
  digitalWrite(RELAY_PIN, HIGH);

  // initialize RTC
  rtc.begin();

  if (!rtc.isrunning())
    // set the time to the compile time, if the RTC is not running
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));

  // set button pin as input
  pinMode(BUTTON_PIN, INPUT);

  // set green LED pin as output
  pinMode(GREEN_LED_PIN, OUTPUT);
  // turn on green LED by default
  digitalWrite(GREEN_LED_PIN, HIGH);

  // set red LED pin as output
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
    mode = button_override ? "Manual" : "Auto";

    // print the button override message
    log("WARNING", "Event: Button override");
  }

  String relay_state = digitalRead(RELAY_PIN) ? "OFF" : "ON";

  log("LOG", "Relay state: " + relay_state + " | Mode: " + mode);

  // wait for 1 second
  delay(1000);
}
