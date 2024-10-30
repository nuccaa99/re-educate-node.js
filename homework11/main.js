// 1) Fetch data from this API: https://jsonplaceholder.typicode.com/users.
// Parse the data so that each object contains only four properties: id, name, username, and email.
// Write the resulting array to a file called users.json.

const https = require("https");
const fileSystemOne = require("fs");

const url = "https://jsonplaceholder.typicode.com/users";

https
  .get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const users = JSON.parse(data);
      const filteredUsers = users.map(({ id, name, username, email }) => ({
        id,
        name,
        username,
        email,
      }));

      fileSystemOne.writeFile(
        "users.json",
        JSON.stringify(filteredUsers),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
          } else {
            console.log("Data written to users.json");
          }
        }
      );
    });
  })
  .on("error", (error) => {
    console.error("Error fetching data:", error);
  });

// 2) Run the command node main.js Ferrari 2020 red, retrieve the data from process.argv,
// and build a car object with the properties id, carModel, carColor, and carReleaseDate.
// Append this object to cars.json. Each time you run this command, a new object should be added to cars.json,
// so if you run it five times, you should have five objects in the file.

// const fileSystemTwo = require("fs");
// const [carModel, carReleaseDate, carColor] = process.argv.slice(2);

// const id = Date.now();

// const car = {
//   id,
//   carModel,
//   carColor,
//   carReleaseDate,
// };

// fileSystemTwo.readFile("cars.json", "utf8", (err, data) => {
//   let cars = [];
//   if (!err && data) {
//     cars = JSON.parse(data);
//   }
//   cars.push(car);
//   fileSystemTwo.writeFile("cars.json", JSON.stringify(cars, null, 2), (err) => {
//     if (err) {
//       console.error("Error writing to file:", err);
//     } else {
//       console.log("Car added to cars.json");
//     }
//   });
// });

// 3) Write a random text into a file named text.txt. Then, read this file and count how many vowels are present.

const fileSystemThree = require("fs");

const randomTxt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

fileSystemThree.writeFile("text.txt", randomTxt, (err) => {
  if (err) {
    console.log("error writing to the file");
    return;
  }
  console.log("random text has been written to the file");

  fileSystemThree.readFile("text.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("error reading the file", err);
      return;
    }
    const vowelsRegex = /[aeiouAEIOU]/g;
    const vowels = data.match(vowelsRegex);
    const vowelsQuantity = vowels ? vowels.length : 0;

    console.log(`Vowel quantity in text.txt is ${vowelsQuantity}`);
  });
});
