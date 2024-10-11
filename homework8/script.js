// 1) Check if a string starts with an uppercase letter.
let str = "String";
const regex = /^[A-Z]/;

console.log(`1) ${regex.test(str)}`);

// 2) Test if a string is a valid date in DD/MM/YYYY format

function isValidDate(dateString) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!regex.test(dateString)) {
    return false;
  }
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

console.log(`2) ${isValidDate("15/02/2020")}`);
console.log(`2) ${isValidDate("37/15/2020")}`);
console.log(`2) ${isValidDate("02/22/199")}`);

// 3) Validate a GE phone number in the format 598-12-34-56

let num = "598-45-33-85";
const regexMob = /^598-\d{2}-\d{2}-\d{2}$/;

console.log(`3) ${regexMob.test(num)}`);

// 4) Validate the emails that ends with @example.com

let email = "bla@example.com";
const regexEmail = /^[a-zA-Z0-9._%+-]+@example\.com$/;
console.log(`4) ${regexEmail.test(email)}`);

// 5) Save the random horoscop data like 10 into localstorage and when
// user enter the website,
// display different horoscop to difference day.
// like first day first horoscop, second day second horoscop and etc.

const horoscopes = [
  "You will have a great day full of energy!",
  "Challenges may come, but you can handle them.",
  "Today is a day for relaxation and reflection.",
  "Opportunities for success are near.",
  "You will meet someone inspiring today.",
  "Focus on your goals and stay positive.",
  "Expect good news regarding work.",
  "A financial gain is on the horizon.",
  "Love and happiness will surround you today.",
  "You may experience an unexpected adventure!",
];

if (!localStorage.getItem("horoscopes")) {
  localStorage.setItem("horoscopes", JSON.stringify(horoscopes));
}

const today = new Date().getDay();
const storedData = JSON.parse(localStorage.getItem("horoscopes"));
const horoscopeOfTheDay = storedData[today % storedData.length];
console.log(`5) ${horoscopeOfTheDay}`);

// 6) Make a form with three inputs name, email and phone number,
// when user try to enter each of this field you
// should save this info into localstorage.
// if you typing info and refresh the page, the info that you wrote
// should not be deleted.

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

window.onload = () => {
  if (localStorage.getItem("name")) {
    nameInput.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("email")) {
    emailInput.value = localStorage.getItem("email");
  }
  if (localStorage.getItem("phone")) {
    phoneInput.value = localStorage.getItem("phone");
  }
};

const handleChange = (e) => {
  localStorage.setItem(e.target.name, e.target.value);
};

nameInput.addEventListener("input", (e) => handleChange(e));
emailInput.addEventListener("input", (e) => handleChange(e));
phoneInput.addEventListener("input", (e) => handleChange(e));

// 7) Create a two button En Ka and the random text below,
// if you choose, en the random text should be translated
// into english, when you click ka it should be translated
// into georgian language. use localstorage to save this info.

const geoBtn = document.querySelector(".geo");
const engBtn = document.querySelector(".eng");
const text = document.querySelector(".text");

const texts = { geo: "გამარჯობა", eng: "hello" };

const setText = (language) => {
  text.textContent = texts[language];
  localStorage.setItem("language", language);
};

const savedData = localStorage.getItem("language");

if (savedData) {
  setText(savedData);
} else {
  setText("geo");
}

geoBtn.addEventListener("click", () => setText("geo"));
engBtn.addEventListener("click", () => setText("eng"));
