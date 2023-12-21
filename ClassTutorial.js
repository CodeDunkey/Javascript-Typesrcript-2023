


// object literals. Et object der ikke kan bruges som skabelon. 
const testObject1 = {
    name: "square1",
    height: 15,
    width: 15,
    area: function () {
        return (
            this.height * this.width
        )
    }
}
console.log("testObject1", testObject1.area());

// Constructor Functions
//#region 
// constructor function. Kan bruges som skabelon
function Square(name, width, height) {
    
    this.name = name;
    this.width = width;
    this.height = height;
}

// creating a prototype for the function Square.
Square.prototype.area  = function () {
    return (
        this.height * this.width
    )
};
Square.prototype.isRectagle  = function () {
    return (
        this.height !== this.width
    )
};

// Object.create
const somePrototype = {
    area: function (){
        return( this.height * this.width )
    },
    perimeter: function () {
        return(2*(this.height + this.width))
    },
    isSquare: function () {
        return(this.height === this.width)
    }
}

function createSome(height, width){
    return Object.create(somePrototype, {
        height:{value: height},
        width:{value: width},
    })
};

const someThing = createSome(10, 30);
console.log("someThing.area", someThing.area())
console.log("someThing.perimeter", someThing.perimeter())


// an instance of Square1.
// 1. a new object is created.
// 2. the constructor is called with the argument that is passed in.
// 3. the this key word is set to the new empty object.
// 4. the new object is returned from the constructor function.
const square1 = new Square("square1", 10, 30);

console.log("square1 area", square1.area());
console.log("square1 is rectagle? ", square1.isRectagle());
console.log("square1", square1.constructor);

// add a property.
square1.color = "blue";
console.log("square1 with color property: ", square1);


const square2 = new Square("square2", 20, 40);
console.log("square2", square2.area(), square2);

// delete a property
delete square2.name;
console.log("square2 without name", square2);

// another way of instanciat a function. 
//the first part "x" is argument, the second part "return x*x" is the function body
const functionObjct = new Function ("x", "return x*x");
console.log("functionObjct", functionObjct(5));

const test1 = class SomeThing1 {
    // class mambers: constructors or methods.


    // // method/funtion:
    // myMethod2: function (){}
    myMethod1() {
        return (123)
    }
};

function Player( name){
    this.name = name;
    this.lvl = 1;
    this.points = 0;
}

Player.prototype.gainXp = function (xp){
    this.points += xp;

    if(this.points >= 10){
        this.lvl++;
        this.points -= 10;
    }
    console.log(this.describe())
}

Player.prototype.describe = function(){
    return(
        `${this.name} is level ${this.lvl} with ${this.points} experience points`
        ); 
}

const player1 = new Player("john");
const player2 = new Player("Sue");

player1.gainXp(4);
player1.gainXp(3);
player2.gainXp(5);
player1.gainXp(6);
player2.gainXp(3);
player1.gainXp(1);
player2.gainXp(2);
player1.gainXp(7);
player2.gainXp(4);
player1.gainXp(1);
player2.gainXp(9);

console.log("Player 1: ", player1.describe())
console.log("Player 2: ", player2.describe())
//#endregion

// A Class
//#region 
class SomethingNew {
    constructor(name, width, height){
        this.name = name;
        this.width = width;
        this.height = height;
    }

    area(){
        return(
            this.width * this.height
        )
    }

    perimeter(){
        return(
            this.width * Math.PI
        )
    }
    logPerimeter(){
        console.log("logPerimeter: ", this.perimeter())
    }
}

const square3 = new SomethingNew ("Circle", 10, 20)

console.log("square3 area", square3.perimeter())
console.log("square3 object of ", Object.getPrototypeOf(square3))
square3.logPerimeter()
//#endregion


// Class inheritens
//#region 

// *Parent class
class Shape {
    constructor(name){
        this.name = name;
    }

    logShapeNameFunc(){
        console.log('Shape name: ' + this.name);
    }
}

// Sub class of Shape
class Circle1 extends Shape{
    constructor(name, radius, height){
        super(name);
        this.radius  = radius;
        this.height = height;
    }
}

const circ1 = new Circle1("my circle", 10, 9999)

console.log(circ1.height);
circ1.logShapeNameFunc();

// Sub class of Shape
class Square2 extends Shape{
    constructor(name, height, width){
        super(name);
        this.height = height;
        this.width = width;
    }

    logShapeNameFunc(){
        console.log('Square name: ' + this.name); 
    }
}

const square4 = new Square2("my square", 15, 15)
square4.logShapeNameFunc();
console.log(square4 instanceof Square2)
console.log(square4 instanceof Shape)
console.log(square4 instanceof Circle1)
//#endregion

// Static Methods
//#region 
class SomeThing2 {
    constructor(name, nr){
        this.nAme = name;
        this.nUmber = nr;
    }

    thisInfo(){
        console.log("this info - number: ", this.nUmber);
    }

    // static method is a method that can only be called by the class,
    // and NOT by an instansiasion of a class
    static theClassId(){
        return ("124abcd####");
    } 
}

const some2 = new SomeThing2("Bob", 1234)
console.log(some2.nAme)
some2.thisInfo()
console.log("Calling the static method trough the class from which it originate: ", SomeThing2.theClassId());
// console.log("Trying to call a static method trough an instance",some2.theClassId());
//#endregion

//bind() and Defining this.
//#region 
class App {
    constructor(){
        this.serverName = "localhost"

        document.querySelector("button").addEventListener('click', this.getServerName.bind(this))
    }

    getServerName(){
        console.log("The server name is: ", this.serverName)
    }
}

const app = new App();
app.getServerName();
//#endregion

// Getters and setters with classes
//#region 
class Person {
    constructor(firstName, lastName){
        this._firstName = firstName;
        this._lastName = lastName;
    }

    // the getter is a function that is public for the class and can be called after initialization
    get firstName (){
        return(
            this.capitalizeFirstChar(this._firstName)
            // without use of method // this._firstName.charAt(0).toUpperCase() + this._firstName.slice(1)
        )
    }

    // the getter is a function that is public for the class and can be called after initialization
    get lastName (){
        return(
            this.capitalizeFirstChar(this._lastName)
            // without use of method // this._firstName.charAt(0).toUpperCase() + this._firstName.slice(1)
        )
    }

    // the getter is a function that is public for the class and can be called after initialization
    get fullName(){
        return (`${this.firstName} ${this.lastName}`)
    }

    // the setter is running when the chosen value is set to something else, as below.
    set firstName (valuue){
        this._firstName = this.capitalizeFirstChar(valuue)
        // without use of method // this._firstName = valuue.charAt(0).toUpperCase() + valuue.slice(1)
    }

    // the setter is running when the chosen value is set to something else, as below.
    set lastName (valuue){
        this._lastName = this.capitalizeFirstChar(valuue)
        // without use of method // this._firstName = valuue.charAt(0).toUpperCase() + valuue.slice(1)
    }

    // method used in get and set.
    capitalizeFirstChar(valuue){
        return valuue.charAt(0).toUpperCase() + valuue.slice(1)
    }
}
const person1 = new Person("john", "johnson")
console.log(person1);
console.log(person1.firstName);
console.log(person1.lastName);
console.log(person1.fullName);
person1.firstName = "joe"; // the setter steps in here
person1.lastName = "smellson"; // the setter steps in here
console.log(person1);
console.log(person1.firstName);
console.log(person1.lastName);
console.log(person1.fullName);

const person2 = new Person("sue", "sueden")
//#endregion


// Getters and Setters with defineProperty() "constructor functions"
//#region 
function Person2(firstName, lastName){
    this._firstName = firstName;
    this._lastName = lastName;

    Object.defineProperty(this, 'firstName', {
        get: function () {
            return this.capitalizeFirstChar(this._firstName);
        },
        set: function (value) {
            this._firstName = value;
        }
    });
    
    Object.defineProperty(this, 'lastName', {
        get: function () {
            return this.capitalizeFirstChar(this._lastName);
        },
        set: function (value) {
            this._lastName = value;
        }
    });
}

// one way of adding a function to the constructor funtion.
Person2.prototype.capitalizeFirstChar = function (value) {
    return(
        value.charAt(0).toUpperCase() + value.slice(1)
    )
}
const person3 = new Person2("bob", "bobson")
console.log(person3.firstName)
console.log(person3.lastName)

//#endregion