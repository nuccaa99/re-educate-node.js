// 1) Create a Car class with properties make, model, and year, then make instance of electric car which have battery level

class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

class ElCar extends Car {
  constructor(make, model, year, batteryLvl) {
    super(make, model, year);
    this.batteryLvl = batteryLvl;
  }
}

const car1 = new ElCar("tesla", "model3", "2022", "80%");
console.log(car1);

// 2) Create a Library class that stores a list of books (as an array) which have following methods addBook(), removeBook(),
// listBooks()

class Library {
  constructor(books) {
    this.books = books;
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    this.books = this.books.filter((item) => item !== book);
  }

  listBooks() {
    this.books.forEach((book) => console.log(book));
  }
}

const books = new Library(["book1", "book2"]);

books.addBook("book3");
books.removeBook("book1");
books.listBooks();

// 3) Create a class Employee with a method calculateSalary() that calculates salary based on hours worked and hourly rate.

class Employee {
  constructor(hours, rate) {
    this.hours = hours;
    this.rate = rate;
  }

  calculateSalary() {
    const salary = this.hours * this.rate;
    console.log(salary);
  }
}

const newEmp = new Employee(17, 60);
newEmp.calculateSalary();

// 4) Create a class ShoppingCart that holds a list of items. methods, addItem(), deleteItem(), updateItem(), calculateTotal()

class ShoppingCart {
  #items = [];

  addItem(itemName, price) {
    const item = {
      itemName,
      price,
    };

    this.#items.push(item);
  }

  deleteItem(itemName) {
    this.#items = this.#items.filter((item) => item.itemName !== itemName);
  }

  updateItem(itemName, newName = null, newPrice = null) {
    const item = this.#items.find((item) => item.itemName === itemName);
    if (item) {
      if (newName) {
        item.itemName = newName;
      }
      if (newPrice !== null) {
        item.price = newPrice;
      }
    } else {
      console.log(`Item "${itemName}" not found.`);
    }
  }

  getList() {
    console.log(this.#items);
  }

  calculateTotal() {
    return this.#items.reduce((total, item) => total + item.price, 0);
  }
}

const cart = new ShoppingCart();
cart.addItem("potato", 5);
cart.addItem("strawberry", 5);
cart.deleteItem("potato");
cart.addItem("butter", 15);
cart.updateItem("strawberry", "mango");
cart.updateItem("butter", "", 19);
cart.getList();
console.log(cart.calculateTotal());

// 5)  Create a CarFactory class that have following methods, addCar, deleteCar, updateCar, getAllCars

class CarFactory {
  #cars = [];

  addCar(brand, model, price) {
    const car = { brand, model, price };
    this.#cars.push(car);
  }

  deleteCar(brand, model) {
    this.#cars = this.#cars.filter(
      (car) => car.brand !== brand || car.model !== model
    );
  }

  updateCar(brand, model, newBrand = null, newModel = null, newPrice = null) {
    const car = this.#cars.find(
      (car) => car.brand === brand && car.model === model
    );
    if (car) {
      if (newBrand) car.brand = newBrand;
      if (newModel) car.model = newModel;
      if (newPrice !== null) car.price = newPrice;
    } else {
      console.log("this kind of car doesn't exist");
    }
  }

  getCars() {
    console.log(this.#cars);
  }
}

const factory = new CarFactory();
factory.addCar("Toyota", "Camry", 1500);
factory.addCar("Chevrolet", "Volt", 25000);
factory.addCar("Ford", "Mustang", 52200);
factory.getCars();
factory.updateCar("Toyota", "Camry", "Honda", "Accord", 28000);
factory.deleteCar("Ford", "Mustang");
factory.getCars();
