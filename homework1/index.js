// 1) You need to write a function that reverses the words in a given string. Words are always separated by a single space. e.g: "Hello World" --> "World Hello"

let str1 = 'Hello World';

const reverse = (str) => {
  let reverseStr = '';
  let splitted = str.split(' ');
  for (let i = splitted.length - 1; i >= 0; i--) {
    reverseStr += splitted[i];
    reverseStr += ' ';
  }
  return reverseStr.trim();
};

console.log(`task1: ${reverse(str1)}`);

// 2) Write a function that cleans whole sentences to numbers. eg: 'This looks5 grea8t!' -> 'This looks great!'

let str2 = 'This looks5 grea8t!';

const clean = (str) => {
  return str.replace(/[0-9]/g, '');
};

console.log(`task2: ${clean(str2)}`);

// 3) Given a string, you have to return a string in which each character (case-sensitive) is repeated once. e.g: "String"      -> "SSttrriinngg"
// e.g: "Hello World" -> "HHeelllloo  WWoorrlldd"

const repeat = (str) => {
  const chars = str.split('');
  let repeated = '';
  chars.forEach((char) => {
    repeated += char + char;
  });
  return repeated;
};

console.log(`task3: ${repeat(str1)}`);

// 4) Make a function that takes a sentences and return the abbreaviate of it. e.g: Sam Harris => S.H.   e.g: hello world everyone => H.W.E

const abbreaviate = (str) => {
  let arr = str.split(' ');
  let abbreaviation = arr.map((word) => word[0].toUpperCase()).join('.');
  return abbreaviation;
};

console.log(`task4: ${abbreaviate(str1)}`);

// 5)Make a function that takes a number as a argument and return rendom word which length would be the number. e.g: 4 => 'h1zt',  5 => 'zvc1e'. you should build random string from all characters and numbers.

const number = 3;

const generateRandom = (num) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charsLength = characters.length;
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * charsLength);
    result += characters[randomIndex];
  }

  return result;
};

console.log(`task5: ${generateRandom(number)}`);
