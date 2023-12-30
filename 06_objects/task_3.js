let objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' }
]

let resultFilter = [];

function filter(arr, prop, value){
  for (let item of arr) {
    if (item[prop] === value)
    resultFilter.push(item);
  }
  return resultFilter;
}

let result = filter(objects, 'name', 'Иван');
console.log(result);
