let objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' }
]


function filter(objects, prop, value){
  let result = [];

  for (let i = 0; i < objects.length - 1; i++) {

    let entries = objects.entries(objects[i]);

    for (let [prop, value] of entries) {
      if (prop = 'name', value = 'Иван') {
        filter.push(objects[i])
        break
      }
    }
  }
  return result
}

let result = filter(objects, 'name', 'Иван');
console.log(result);
