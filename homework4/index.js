// 1)  Write a function that takes two or more objects as arguments and merges them into a single object
const obj1 = { a: 5, b: 12 };
const obj2 = { c: 45, d: 14 };
const obj3 = { d: 5 };

function combine(...obejcts) {
  return obejcts.reduce((acc, object) => ({ ...acc, ...object }), {});
}

console.log(combine(obj1, obj2, obj3));

// 2)  Write a function that takes an object and a key as input and deletes the specified key from the object.

function deleteKey(object, key) {
  delete object[key];
  return object;
}

console.log(deleteKey(obj1, 'b'));

// 3) Create an object representing a car with properties for make, model, and year. Then add a method that returns the car's full description.

const car = {
  make: 'chevrolet',
  model: 'camaro',
  year: '2016',
};

car.getDescription = function () {
  return `${this.make} ${this.model} ${this.year}`;
};

console.log(car.getDescription());

// 4) Create an object representing a shopping cart. Add methods to add items, remove items, and calculate the total price.

const cart = {
  cartItems: [],
};

cart.add = function (item, price) {
  return this.cartItems.push({ item, price });
};

cart.delete = function (itemName) {
  const index = this.cartItems.findIndex((item) => item.item === itemName);
  this.cartItems.splice(index, 1);
};

cart.calculateTotal = function () {
  return this.cartItems.reduce((sum, item) => sum + item.price, 0);
};

cart.add('toy', 5);
cart.add('barbie', 10);
cart.add('apple', 2.76);
cart.add('pasta', 3);
cart.delete('toy');

console.log(cart.calculateTotal());
