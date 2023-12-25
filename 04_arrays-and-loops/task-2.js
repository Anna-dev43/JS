let arr = [];
let count = 5;
// let count = 7;
// let count = 3;

for (let i = 0; i < count; i++) {
  arr.push(i)
}

for (let i = 0; i < arr.length; i++) {
  let j = Math.floor(Math.random() * arr.length);
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp
}
console.log(arr)
