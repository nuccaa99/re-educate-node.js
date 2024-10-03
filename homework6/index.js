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

// 4) write a function that try to get data from this two sources:  https://dummyjson.com/users and 
// https://jsonplaceholder.typicode.com/users and return the only response which has faster response, 
// use fetch or axios method.



// 5) create a three promise that returns any kind of arrays with difference time. one of one of them 
// should be reject other two should be fulfilled. merged the only fulfilled arrays.
