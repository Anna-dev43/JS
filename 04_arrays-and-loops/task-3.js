let n = 3;
let array = [2,5,1,3,4];

/*let n = 1;
let array = [5,1,3,2,7,6,4];*/

/*let n = 7;
let array = [2,1,3];*/

let index = 0;

for (let i = 0; i < array.length; i++) {
  if (array[i] == n) {
    index = 1;
    break;
  }
}

if (index == 0) {
  console.log('Элемент не найден');
} else {
  console.log('Индекс элемента', index);
}
