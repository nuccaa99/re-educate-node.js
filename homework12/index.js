// 1) Create a function that checks if a received folder name exists in the root directory.

// const fs = require("fs");
// const path = require("path");

// function folderExists(folderName) {
//   const rootDir = path.resolve("./");
//   const folderPath = path.join(rootDir, folderName);
//   return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory();
// }
// const folderName = "example";
// console.log(
//   folderExists(folderName) ? "Folder exists" : "Folder does not exist"
// );

// 2) Create a simple HTTP GET server that reads user data from data.json and returns it to the client.
// Ensure that data.json is present before reading the data.

const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    await fs.access("data.json");
    const data = await fs.readFile("data.json", "utf-8");
    const users = JSON.parse(data);
    console.log(users);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  }

  // 3) Add a new route that returns a random number between 1 and 100 at /random.

  if (req.url === "/random") {
    const number = Math.floor(Math.random() * 100) + 1;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(JSON.stringify(number));
    res.end();
  }

  // 4) Add a new route that returns a simple HTML table at /html.
  if (req.url === "/html") {
    const html = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
         <p>hi</p>
        </body>
    </html>`;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  }
  // 5) Add a new route that returns the current time in ISO format at /current-time.

  if (req.url === "/current-time") {
    const date = new Date().toISOString();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(JSON.stringify(date));
    res.end();
  }

  // 6) Add a new route that returns an array of objects, such as users, animals, posts, etc., at /api.

  if (req.url === "/api") {
    const data = [
      { id: 1, species: "Dog", name: "Buddy", age: 5 },
      { id: 2, species: "Cat", name: "Whiskers", age: 3 },
      { id: 3, species: "Rabbit", name: "Fluffy", age: 2 },
    ];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(data));
    res.end();
  }
});
server.listen(3000, () => {
  console.log("server running on");
});
