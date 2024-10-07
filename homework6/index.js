// 1) make a promise that rejects or resolves 50/50

const fiftyfiftyPromise = new Promise((resolve, reject) => {
  const rand = Math.random();
  if (rand > 0.5) {
    resolve("success");
  } else {
    reject("fail");
  }
});

fiftyfiftyPromise
  .then((msg) => {
    console.log(msg);
  })
  .catch((error) => {
    console.log(error);
  });

// 2) write a function that get data from: https://jsonplaceholder.typicode.com/users and return result

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem while fetching:", error);
  }
}

fetchData().then((data) => console.log(data));

// 3) write a function that try to get data from: https://jsonplaceholde.typicode.com (link is invalid for this task)
// if request will failed try to retrieve it 5 times

async function fetchDataRetry(url, maxTries = 5) {
  let attempts = 0;
  while (attempts < maxTries) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed: ${error.message}`);

      if (attempts >= maxTries) {
        throw new Error("unable to retrieve data.");
      }
    }
  }
}

fetchDataRetry("https://jsonplaceholde.typicode.com")
  .then((data) => console.log(data))
  .catch((error) => console.error("error:", error.message));

// 4) write a function that try to get data from this two sources:  https://dummyjson.com/users and
// https://jsonplaceholder.typicode.com/users and return the only response which has faster response,
// use fetch or axios method.

async function fetchDataFast() {
  try {
    const response1 = await fetch("https://dummyjson.com/users");
    const response2 = await fetch("https://jsonplaceholder.typicode.com/users");

    const fasterResponse = await Promise.race([response1, response2]);
    const data = await fasterResponse.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
fetchDataFast().then((data) => console.log("Faster data:", data));

// 5) create a three promise that returns any kind of arrays with difference time. one of one of them
// should be reject other two should be fulfilled. merged the only fulfilled arrays.
