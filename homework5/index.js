// 1) write a function that takes a random number as an argument and logs the random number
// while the argument number and random number are equal. argument number should be from 0 to 10.

function func(arg) {
  let randomNumber = Math.floor(Math.random() * 11);
  while (arg === randomNumber) {
    console.log(randomNumber);
    randomNumber = Math.floor(Math.random() * 11);
  }
}

let argument = Math.floor(Math.random() * 11);
func(argument);

// 2) write a function that imitates to return fake data, use setTimeout. make both async/await and .then.catch methods.

function getFakeData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fakeData = Math.floor(Math.random() * 100);
      const success = Math.random() > 0.2;

      if (success) {
        resolve(fakeData);
      } else {
        reject("Error: Failed to fetch fake data.");
      }
    }, 2000);
  });
}

async function fetchFakeDataAsync() {
  try {
    const data = await getFakeData();
    console.log("Fake data received (async/await):", data);
  } catch (error) {
    console.error(error);
  }
}
fetchFakeDataAsync();

function fetchFakeDataThen() {
  getFakeData()
    .then((data) => {
      console.log("Fake data received (.then):", data);
    })
    .catch((error) => {
      console.error(error);
    });
}
fetchFakeDataThen();

// 3)write a sleep function. make a function that takes a ms as an argument and when you call this function waits
// untill this function resolved. use setTimeout and promises.
// eg: console.log('first')
// await sleep(2000)
// console.log('second')
// second should sleep after 2 seconds

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
(async () => {
  console.log("first");
  await sleep(2000);
  console.log("second");
})();
