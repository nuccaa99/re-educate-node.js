#! /usr/bin/env node

// 1)Create a weather API CLI tool that:
//         /Takes a city name as input. eg: weather-api tbilisi
//         /Fetches and displays the exact temperature in Celsius using this API endpoint:
//   API: https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c
// use: node-fetch and commander

import { Command } from "commander";
import { config } from "dotenv";
// import { readFile, writeFile } from "./utils.js";

config();
const program = new Command();

const apiKey = process.env.API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city) {
  const url = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      console.log(`City ${city} not found.`);
      return;
    }

    const temp = data.main.temp;
    console.log(`The temp in ${city} is ${temp}°C.`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

program
  .command("weather <city>")
  .description("Get the temp for a city")
  .action(async (city) => {
    await fetchWeather(city);
  });

program.parse();

// 2) Create a Car factory CLI tool that.
//      /Takes a car name, car price and car color
//      /add new car in cars.json
//      /delete car
//      /show all cars
//      /update car
//      /get car by id
