let user1={name: 'Игорь', age: 17}
let user2={name: 'Оля', age: 21}

function getOlderUser(userOne, userTwo) {
  if (user1.age > user2.age) {
    return 'Пользователь' + user1.name + 'старше, ему(ей)' + user1.age
  } else
    if (user1.age === user2.age) {
      return 'Возраст пользователей равны'
    }
    else {
      return 'Пользователь' + user2.name + 'старше, ему(ей)' + user2.age
    }
}

let result = getOlderUser(user1, user2)
console.log(result);


/*let allUsers = [
  {name: 'Валя', age: 11},
  {name: 'Таня', age: 24},
  {name: 'Рома', age: 21},
  {name: 'Надя', age: 34},
  {name: 'Антон', age: 7}
]

function getOlderUserArray(users){
  let oldestUser = 0;
  let newObject = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i].age > oldestUser) {
      oldestUser = users[i].age;
      newObject = users[i];
    }
  }
  return newObject.name;
}

console.log(getOlderUserArray(allUsers));*/
