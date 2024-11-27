interface Rectangle {
  width: number;
  height: number;
}

interface Circle {
  radius: number;
}

class RectangleClass {
  constructor(public width: number, public height: number) {}

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class CircleClass {
  constructor(public radius: number) {}

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}
function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}

function findMax(numbers: number[]): number {
  return Math.max(...numbers);
}

function isPalindrome(str: string): boolean {
  const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  const reversedStr = cleanStr.split('').reverse().join('');
  return cleanStr === reversedStr;
}

function calculateFactorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * calculateFactorial(n - 1);
  }
}

// ტესტები

const rectangle = new RectangleClass(5, 8);
const circle = new CircleClass(3);

const rectangleArea = rectangle.calculateArea();
const rectanglePerimeter = rectangle.calculatePerimeter();

const circleArea = circle.calculateArea();
const circlePerimeter = circle.calculatePerimeter();

console.log(
  `Rectangle Area: ${rectangleArea}, Perimeter: ${rectanglePerimeter}`
);
console.log(`Circle Area: ${circleArea}, Perimeter: ${circlePerimeter}`);

const sumResult = addNumbers(5, 3);
const multiplicationResult = multiplyNumbers(4, 7);
const capitalizedString = capitalizeString('javascript is fun');
const evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(`Sum: ${sumResult}`);
console.log(`Multiplication: ${multiplicationResult}`);
console.log(`Capitalized String: ${capitalizedString}`);
console.log(`Even Numbers: ${evenNumbers}`);

const maxNumber = findMax([23, 56, 12, 89, 43]);
const isPalindromeResult = isPalindrome('A man, a plan, a canal, Panama');
const factorialResult = calculateFactorial(5);

console.log(`Max Number: ${maxNumber}`);
console.log(`Is Palindrome: ${isPalindromeResult}`);
console.log(`Factorial: ${factorialResult}`);

// 2.

type Transaction = {
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  time: Date;
};

class BankAccount {
  private readonly _accountNumber: string;
  private _balance: number;
  private _transactionHistory: Transaction[];

  constructor(accountNumber: string, initialBalance: number = 0) {
    this._accountNumber = accountNumber;
    this._balance = initialBalance;
    this._transactionHistory = [];

    if (initialBalance > 0) {
      this.recordTransaction({
        type: 'deposit',
        amount: initialBalance,
        time: new Date(),
      });
    }
  }

  getAccountInfo(): { accountNumber: string; balance: number } {
    return {
      accountNumber: this._accountNumber,
      balance: this._balance,
    };
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }
    this._balance += amount;
    this.recordTransaction({
      type: 'deposit',
      amount,
      time: new Date(),
    });
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }
    if (amount > this._balance) {
      throw new Error('Not enough funds');
    }
    this._balance -= amount;
    this.recordTransaction({
      type: 'withdraw',
      amount,
      time: new Date(),
    });
  }

  transferFunds(targetAccount: BankAccount, amount: number): void {
    if (amount <= 0) {
      throw new Error('Transfer amount must be positive');
    }
    if (amount > this._balance) {
      throw new Error('Not enough funds for transfer');
    }

    this.withdraw(amount);

    targetAccount.deposit(amount);
  }

  getTransactionHistory(): Transaction[] {
    return [...this._transactionHistory];
  }

  private recordTransaction(transaction: Transaction): void {
    this._transactionHistory.push(transaction);
  }
}

function func() {
  const account1 = new BankAccount('ACC1', 1000);
  const account2 = new BankAccount('ACC2', 500);

  console.log('Initial Account Information:');
  console.log('Account 1:', account1.getAccountInfo());
  console.log('Account 2:', account2.getAccountInfo());

  account1.deposit(300);
  account1.withdraw(200);
  account1.transferFunds(account2, 150);

  console.log('After Operations:');
  console.log('Acc1:', account1.getAccountInfo());
  console.log('Acc2:', account2.getAccountInfo());

  console.log('Acc1 Transaction History:');
  console.log(account1.getTransactionHistory());

  console.log('Acc2 Transaction History:');
  console.log(account2.getTransactionHistory());
}

func();
