///////////////////////
//CONSTRUCTOR FUNCTION
///////////////////////

// var Person = function(name, yob, job){
//     this.name = name;
//     this.yob = yob;
//     this.job = job;
// }

// Person.prototype.calculateAge = function(){
//     console.log(2019 - this.yob)
// }

// // Person.prototype.lastName = this.lastName

// var john = new Person('John', 1990, 'teacher');
// var eric = new Person('Eric', 1988, 'SOFTWARE ENGINEER')
// var abby = new Person('Abby', 1993, 'nurse')

// eric.lastName = 'olaveson'

// console.log(eric.lastName)

//////////////////////////////
//OBJECT.CREATE
//////////////////////////////
//in this way we do not capitalize the variable

/*
var personProto = {
    calculateAge: function() {
        console.log(2019-this.yob)
    }
}

var eric = Object.create(personProto);
eric.name = 'Eric';
eric.yob = 1988;
eric.job = 'programmer';

var abby = Object.create(personProto, 
    {
        name: {value: 'Abby'},
        yob: {value: 1993},
        job: {value: 'nurse'}
    });
*/


//PRIMITIVES
var a = 23;
var b = a;
a = 12;
console.log(a, b)
// a = 12 while b = 23

//OBJECTS
var obj1 = { 
    name: 'Eric',
    age: 25
}
var obj2 = obj1
obj1.age = 30;
console.log(obj1)
console.log(obj2)
// Both objects have the age = 30

//FUNCTIONS
var age = 30;
var obj = {
    name : 'Eric',
    city : 'Dallas'
}
function change(a, b){
    a = 27;
    b.city = 'Rigby'
}
change(age, obj)
console.log(age, obj)


