#! /usr/bin/env node

// 1)Create a weather API CLI tool that:
//         /Takes a city name as input. eg: weather-api tbilisi
//         /Fetches and displays the exact temperature in Celsius using this API endpoint:
//   API: https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c
// use: node-fetch and commander

import { Command } from "commander";
import { config } from "dotenv";
import { readFile, writeFile } from "./utils.js";

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

// 2) Create a Car factory CLI tool that.
//      /Takes a car name, car price and car color
//      /add new car in cars.json
//      /delete car
//      /show all cars
//      /update car
//      /get car by id

program
  .command("add")
  .description("add new car in the filesystem")
  .argument("<name>", "car name")
  .argument("<price>", "car price")
  .argument("<color>", "car color")
  .action(async (name, price, color) => {
    const cars = await readFile("cars.json", true);
    const lastId = cars[cars.length - 1]?.id || 0;
    const newCar = {
      id: lastId + 1,
      name,
      price,
      color,
    };
    cars.push(newCar);
    await writeFile("cars.json", JSON.stringify(cars));
  });

program
  .command("delete <id>")
  .description("delete a car")
  .action(async (id) => {
    let cars = await readFile("cars.json", true);
    const carId = Number(id);
    cars = cars.filter((car) => car.id !== carId);
    await writeFile("cars.json", JSON.stringify(cars));
  });

program
  .command("show")
  .description("show all cars")
  .action(async () => {
    const cars = await readFile("cars.json", true);
    if (cars.length === 0) {
      console.log("no cars available");
    } else {
      cars.forEach((car) => {
        console.log(`${car.id}: ${car.name} (${car.color}) $${car.price}`);
      });
    }
  });

program
  .command("update <id> <name> <price> <color>")
  .description("Update a car")
  .action(async (id, name, price, color) => {
    const carId = Number(id);
    const cars = await readFile("cars.json", true);
    const carIndex = cars.findIndex((car) => car.id === carId);

    if (carIndex === -1) {
      console.log(`Car with this id - ${carId} not found.`);
    } else {
      cars[carIndex] = { id: carId, name, price, color };
      await writeFile("cars.json", JSON.stringify(cars));
      console.log(`Car with ID ${carId} updated successfully.`);
    }
  });

program
  .command("get <id>")
  .description("Get a car by ID")
  .action(async (id) => {
    const carId = Number(id);
    const cars = await readFile("cars.json", true);
    const car = cars.find((car) => car.id === carId);
    if (!car) {
      console.log(`Car with ID ${id} not found.`);
    } else {
      console.log(
        `Car with ID ${id} - ${car.name}, ${car.color} - $${car.price}`
      );
    }
  });

program.parse();
