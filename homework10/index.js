// 1) Write a function that receives 3 parameters: amount of money,
// dayLimit and weekLimit you should calculate how many days does it needs to withdway whole
// amount of money.

const calcDays = (money, dayLimit, weekLimit) => {
  let remaining = money;
  let totalDays = 0;
  while (remaining > 0) {
    const weeklyWithdrawal = Math.min(weekLimit, remaining);
    let dailyWithdrawn = 0;

    while (dailyWithdrawn < weeklyWithdrawal && remaining > 0) {
      const dailyWithdrawal = Math.min(dayLimit, remaining);
      dailyWithdrawn += dailyWithdrawal;
      remaining -= dailyWithdrawal;
      totalDays++;
    }
  }
  return totalDays;
};

const money = 1500;
const dayLimit = 200;
const weekLimit = 800;

console.log(calcDays(money, dayLimit, weekLimit));

// 2) Write a function that takes text as a parameter, the text should be: "What is a plus b?"
// or "What is a minus b?" you should write correct answer, if answer is correct console you're humar
// other wise consoled you're robot

const solve = (txt, answer) => {
  const arr = txt.split(' ');
  let res = 0;
  if (arr[3] === 'plus') {
    res += parseInt(arr[2]) + parseInt(arr[4]);
  } else if (arr[3] === 'minus') {
    res += parseInt(arr[2]) - parseInt(arr[4]);
  }

  if (answer === res) {
    console.log("you're human");
  } else {
    console.log("you're robot");
  }
};

const userAnswer = 5;
solve('What is 10 minus 7?', userAnswer);

// 3) write a function that takes 2 parameter the height and width you draw that rectangle with #
// eg: 2, 2 =>
// ##
// ##

// eg: 3:4
// ####
// ####
// ####

const draw = (a, b) => {
  for (let i = 0; i < a; i++) {
    console.log('#'.repeat(b));
  }
};

draw(3, 4);
// 4) write a function that takes number as a parameter and check is this number wide or not.
// * wide means that If the number of its digits is greater than the sum of the digits.

const isWideNumber = (num) => {
  let sum = 0;
  for (let i = 0; i < num.toString().length; i++) {
    sum += parseInt(num.toString()[i]);
  }

  if (num.toString().length >= sum) {
    return true;
  } else {
    return false;
  }
};

console.log(isWideNumber(123));
console.log(isWideNumber(1111));
