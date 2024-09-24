// 1) Check if any number in the array is divisible by 5 and if true, find its index e.g: [3, 6, 10, 12] → 2

const arr = [3, 6, 10, 12];

arr.forEach((item) => {
  if (item % 5 === 0) {
    console.log(arr.indexOf(item));
  }
});

// 2) Filter out negative numbers from a nested array e.g: [[1, -2], [3, -4], [5]] → [1, 3, 5]

const arr2 = [[1, -2], [3, -4], [5]];
console.log(arr2.flat().filter((item) => item > 0));

// 3) Filter out non-array elements and then check if the remaining elements are arrays e.g: [1, [2, 3], "hello", [4]] → true for remaining arrays

const arr3 = [1, [2, 3], 'hello', [4]];
const filteredArr = arr.filter(Array.isArray);
const allArrays = filteredArr.every(Array.isArray);
console.log(allArrays);

// 4) Flatten a nested array and find the sum of all elements e.g: [[2, 4], [6, 8]] → 20

const arr4 = [
  [2, 4],
  [6, 8],
];

console.log(
  arr4.flat().reduce((acc, curr) => {
    return acc + curr;
  }, 0)
);

// 5) Flatten a nested array, then square each number, and calculate sum the squares
console.log(
  arr4
    .flat()
    .map((item) => item * item)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0)
);

// 6)
// Get the total number of characters by eye color (hint. a map of eye color to count)
// e.g: {
// brown: 1,
// yellow: 1,
// blue: 2
// }

const characters = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    eye_color: 'blue',
    gender: 'male',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    eye_color: 'yellow',
    gender: 'male',
  },
  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    eye_color: 'brown',
    gender: 'female',
  },
  {
    name: 'Anakin Skywalker',
    height: '188',
    mass: '84',
    eye_color: 'blue',
    gender: 'male',
  },
];

const eyeColors = characters.reduce((acc, curr) => {
  acc[curr.eye_color] = (acc[curr.eye_color] || 0) + 1;
  return acc;
}, {});

console.log(eyeColors);
