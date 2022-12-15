#include <Arduino.h>
#include <SPI.h>
#include "LiquidCrystal_I2C.h"
#include "RTClib.h"

#define RELAY_PIN 2 // relay pin definition

#define LCD_ADDRESS 0x27 // address of the LCD
#define LCD_COLUMNS 16   // number of columns of the LCD
#define LCD_ROWS 2       // number of rows of the LCD

#define BUTTON_PIN 3 // button pin definition

#define GREEN_LED_PIN 4 // green LED pin definition
#define RED_LED_PIN 5   // red LED pin definition

#define LDR_PIN A0 // LDR pin definition

// LCD object
LiquidCrystal_I2C lcd(LCD_ADDRESS, LCD_COLUMNS, LCD_ROWS);

// RTC object
RTC_DS1307 rtc;

bool buttonOverride = false; // button override flag
String mode = "AUTO";        // mode flag

void setup()
{
  // set relay pin as output
  pinMode(RELAY_PIN, OUTPUT);
  // turn off relay by turning the pin high
  digitalWrite(RELAY_PIN, HIGH);

  // initialize RTC
  rtc.begin();

  // if RTC is not running
  if (!rtc.isrunning())
    // set the time to the compile time
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));

  // initialize LCD
  lcd.init();
  lcd.backlight();

  // set button pin as input
  pinMode(BUTTON_PIN, INPUT);

  // set green LED pin as output
  pinMode(GREEN_LED_PIN, OUTPUT);
  // turn on green LED by turning the pin high
  digitalWrite(GREEN_LED_PIN, HIGH);

  // set red LED pin as output
  pinMode(RED_LED_PIN, OUTPUT);
  // turn off red LED by turning the pin high
  digitalWrite(RED_LED_PIN, LOW);

  // initialize serial communication
  Serial.begin(9600);
}

void loop()
{
  // get the relay state
  String relayState = digitalRead(RELAY_PIN) ? "OFF" : "ON";

  // get the current time
  DateTime timestamp = rtc.now();

  // format the current date
  String day = timestamp.day() < 10 ? "0" + String(timestamp.day()) : String(timestamp.day());
  String month = timestamp.month() < 10 ? "0" + String(timestamp.month()) : String(timestamp.month());
  String date = day + "/" + month + "/" + String(timestamp.year());

  // format the current time
  String hour = timestamp.hour() < 10 ? "0" + String(timestamp.hour()) : String(timestamp.hour());
  String minute = timestamp.minute() < 10 ? "0" + String(timestamp.minute()) : String(timestamp.minute());
  String second = timestamp.second() < 10 ? "0" + String(timestamp.second()) : String(timestamp.second());
  String time = hour + ":" + minute + ":" + second;

  // print the current date to the serial monitor
  Serial.print("[LOG]");
  Serial.print(" Date: ");
  Serial.print(date);
  // print the current time to the serial monitor
  Serial.print(" | Time: ");
  Serial.print(time);
  // print the relay state to the serial monitor
  Serial.print(" | Relay state: ");
  Serial.print(relayState);
  // print the mode to the serial monitor
  Serial.print(" | Mode: ");
  Serial.println(mode);

  // print the current date to the LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(date);
  // print the relay state to the LCD
  lcd.setCursor(LCD_COLUMNS - relayState.length(), 0);
  lcd.print(relayState);
  // print the current time to the LCD
  lcd.setCursor(0, 1);
  lcd.print(time);
  // print the mode to the LCD
  lcd.setCursor(LCD_COLUMNS - mode.length(), 1);
  lcd.print(mode);

  // if the current time is between 6h and 18h and the button is not pressed
  if (timestamp.hour() >= 6 && timestamp.hour() < 18 && !buttonOverride)
  {
    // turn on relay by turning the pin low
    digitalWrite(RELAY_PIN, LOW);

    // while the LDR is not detecting light
    while (analogRead(LDR_PIN) >= 384)
    {
      Serial.print("[WARNING]");
      Serial.print(" Date: ");
      Serial.print(date);
      Serial.print(" | Time: ");
      Serial.print(time);
      Serial.println(" | Event: Hard reset of the relay");

      // hard reset the relay
      digitalWrite(RELAY_PIN, HIGH);
      delay(1000);
      digitalWrite(RELAY_PIN, LOW);
      delay(1000);
    }
  }
  else if (!buttonOverride)
  {
    // turn off relay by turning the pin high
    digitalWrite(RELAY_PIN, HIGH);

    // while the LDR is detecting light
    while (analogRead(LDR_PIN) < 384)
    {
      Serial.print("[WARNING]");
      Serial.print(" Date: ");
      Serial.print(date);
      Serial.print(" | Time: ");
      Serial.print(time);
      Serial.println(" | Event: Hard reset of the relay");

      // hard reset the relay
      digitalWrite(RELAY_PIN, LOW);
      delay(1000);
      digitalWrite(RELAY_PIN, HIGH);
      delay(1000);
    }
  }

  // if the button is pressed
  if (digitalRead(BUTTON_PIN))
  {
    // toggle the relay
    digitalWrite(RELAY_PIN, !digitalRead(RELAY_PIN));

    // set the button override flag
    buttonOverride = !buttonOverride;

    // turn off green LED by turning the pin high
    digitalWrite(GREEN_LED_PIN, !digitalRead(GREEN_LED_PIN));

    // turn on red LED by turning the pin low
    digitalWrite(RED_LED_PIN, !digitalRead(RED_LED_PIN));

    // set the mode flag
    mode = buttonOverride ? "MANUAL" : "AUTO";

    // print the button override message
    Serial.print("[WARNING]");
    Serial.print(" Date: ");
    Serial.print(date);
    Serial.print(" | Time: ");
    Serial.print(time);
    Serial.println(" | Event: Button override");
  }

  // wait for 1 second
  delay(1000);
}
