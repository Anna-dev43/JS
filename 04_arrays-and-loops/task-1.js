let a = [];
let n = 0;
let m = 100;
let count = 100;

/*
let a = [];
let n = 2;
let m = 5;
let count = 50;
*/

/*
let a = [];
let n = 100;
let m = -5;
let count = 70;
*/

/*
let a = [];
let n = -3;
let m = -10;
let count = 42;
*/

for ( let i = 0; i < count; i++) {
  a.push(Math.round(Math.random() * (m - n) + n));
}

console.log(a);
