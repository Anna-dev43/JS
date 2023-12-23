let array = [];
let count = 5;

for (let i = 1; array.length < count; ++i) {
  array.push(i);
}

console.log (array);

for (let i = 0; array.length < count; ++i) {
  let j = 0;
  array[j] = Math.round((Math.random() * Math.abs(count)));
  temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

console.log (array);
