// 1) შექმენით ინფუთი რომლის სერჩის დროს რექუესთს გააგზავნით შემდეგ აიპიაიზე: https://api.escuelajs.co/api/v1/products?title=wooden როგორც
// ხედავთ თაითლი არის ქუერი პარამეტრი, დებაუნს ტექნიკით
// გააკეთეთ ინფუთი რომლის ჩაწერაზეც, დარექუსთდება სწორედ title პარამეტრით.

const apiUrl = "https://api.escuelajs.co/api/v1/products?";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const searchInput = document.getElementById("input");

async function handleSearch(event) {
  const q = event.target.value;
  try {
    const resp = await fetch(`${apiUrl}title=${q}`);
    if (!resp.ok) {
      throw new Error("Failed to fetch products.");
    }
    const products = await resp.json();
    console.log(products);
  } catch (error) {
    console.log("fetching error", error);
  }
}
const debouncedSearch = debounce(handleSearch, 300);
searchInput.addEventListener("input", debouncedSearch);

// 2) წამოიღეთ ინფორმაცია შემდეგი ეიპიაიდან: https://jsonplaceholder.typicode.com/users ,
// მოსული დატა გაპარსეთ შემდეგნაირად, თითოეულ ობიექტს უნდა ჰქონდეს მხოლოდ 4 ფროფერთი აიდი,
// სახელი, იუზერნეიმი და იმეილი

async function getData() {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!resp.ok) {
      throw new Error("Failed to fetch products.");
    }
    const users = await resp.json();
    const parsedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      userName: user.username,
      mail: user.email,
    }));
    console.log(parsedUsers);
  } catch (error) {
    console.log("fetching error", error);
  }
}
getData();

// 3) გაქვთ ორი აიპიაი https://fakestoreapi.com/users  და https://jsonplaceholder.typicode.com/users თქვენი მიზანია ორივე ერთდოულად
// დაარიზოლვოთ და ისე გამოიტანოთ დომში შესაბამისი ინფორამცია იუზერებზე, ანუ სანამ ორივე აიპიაი პასუხს არ
// დააბრუნებს მანამდე არაფერი გამოაჩინოთ დომში.

const listOne = document.querySelector(".data_list_one");
const listTwo = document.querySelector(".data_list_Two");

async function getBothData() {
  try {
    const resp = await Promise.all([
      fetch("https://fakestoreapi.com/users"),
      fetch("https://jsonplaceholder.typicode.com/users"),
    ]);
    if (!resp[0].ok || !resp[1].ok) {
      throw new Error("Failed to fetch products.");
    }
    const data = await Promise.all(resp.map((response) => response.json()));

    data[0].map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name.firstname} ${item.name.lastname}, ${item.email}`;
      listOne.appendChild(listItem);
    });

    data[1].map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name}, ${item.email}`;
      listTwo.appendChild(listItem);
    });
  } catch (error) {
    console.log("fetching error", error);
  }
}
getBothData();

// 4) დაწერეთ ფუნცქია რომელიც დაგვილოგავს მაუსის კორდინატებს მას შემდეგ რაც გავაჩერებთ მაუსს, გამოიყენეთ დიბაუნს ტექნიკა

function handleMouseMove(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  res.textContent = `Mouse Coordinates: ${mouseX} and ${mouseY}`;
}

const debouncedMouseMove = debounce(handleMouseMove, 300);

document.addEventListener("mousemove", debouncedMouseMove);

const res = document.getElementById("mouse_result");
