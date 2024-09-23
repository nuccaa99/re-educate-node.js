// 1) Create a function that counts the Number of Digits in Each Element, e.g: [123, 45, 6] becomes [3, 2, 1]).
// 2) Write a function that takes an array of numbers and reverses the order of its elements using a loop. Don't use reverse(). e.g: [1,2,3] => [3,2,1]
// 3) Write a function that returns the sum of the squares of all the numbers in an array (e.g., [1, 2, 3] returns 1^2 + 2^2 + 3^2 = 14). Use a loop to calculate the squares.
// 4) Write a function that counts the total number of characters in all the strings in an array. e.g:["a", "ab", "abc"] => 6
// 5) Write a function that takes an array of strings and returns the new array with the palindrome words. palindrome words are level, becase if you reverse this word its the same, like madam.  e.g: ['level', 'giga', 'ana', 'button', 'abba'] => ['level', 'ana', 'abba']
// 6) Task: Write a function that filters out all words from an array that contain special characters (e.g., @, #, $).
// Bonus: Return both the filtered array and the removed words. dont use filter metohds use it with for loop.

// 1
const arr = [123, 45, 6];

let result = arr.map((item) => item.toString().length);

console.log(result);

// 2

const reverse = (arr) => {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }

  return reversed;
};

console.log(reverse(arr));

// 3
const square = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i] * arr[i];
  }
  return sum;
};

console.log(square(arr));

// 4

const strings = ['a', 'ab', 'abc'];

const lengths = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    count += arr[i].length;
  }
  return count;
};

console.log(lengths(strings));

// 5

const array = ['level', 'giga', 'ana', 'button', 'abba'];

const isPalindrome = (str) => {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

const getPalindromes = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (isPalindrome(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
};

console.log(getPalindromes(array));

// 6
const words = ['hello', 'world', 'te$t', 'ja#va', 'code'];

const filterSpecialCharacters = (words) => {
  const filteredArray = [];
  const removedWords = [];
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;

  for (let i = 0; i < words.length; i++) {
    if (specialChars.test(words[i])) {
      removedWords.push(words[i]);
    } else {
      filteredArray.push(words[i]);
    }
  }

  return {
    filteredArray,
    removedWords,
  };
};

console.log(filterSpecialCharacters(words));
