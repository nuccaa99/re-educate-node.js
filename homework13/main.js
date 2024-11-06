#! /usr/bin/env node

// 1)Create a weather API CLI tool that:
//         /Takes a city name as input. eg: weather-api tbilisi
//         /Fetches and displays the exact temperature in Celsius using this API endpoint:
//   API: https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c
// use: node-fetch and commander

import { Command } from "commander";
import { readFile, writeFile } from "./utils.js";
const program = new Command();

program
  .command("create")
  .description("create new user in the filesystem")
  .argument("<name>", "user name")
  .argument("<age>", "user age")
  .action(async (name, age) => {
    const users = await readFile("users.json", true);
    const lastId = users[users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      name,
      age: Number(age),
    };
    users.push(newUser);
    await writeFile("users.json", JSON.stringify(users));
  });

program.parse();

// 2) Create a Car factory CLI tool that.
//      /Takes a car name, car price and car color
//      /add new car in cars.json
//      /delete car
//      /show all cars
//      /update car
//      /get car by id
