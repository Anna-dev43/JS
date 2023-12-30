let user1 = {name: 'Игорь', age: 17}
let user2 = {name: 'Оля', age: 21}

function getOlderUser(userOne, userTwo) {
  if (userOne.age > userTwo.age) {
    return 'Пользователь ' + userOne.name + ' старше, ему(ей) ' + userOne.age
  }

  if (userOne.age === userTwo.age) {
      return 'Возраст пользователей равны'
  }

  return 'Пользователь ' + userTwo.name + ' старше, ему(ей) ' + userTwo.age
}

let result = getOlderUser(user1, user2);
console.log(result);

// Вариант решения № 1

// let allUsers = [
//   {name: 'Валя', age: 11},
//   {name: 'Таня', age: 24},
//   {name: 'Рома', age: 21},
//   {name: 'Надя', age: 34},
//   {name: 'Антон', age: 7}
// ]

// function getOlderUserArray(users){
//   let oldestUser = 0;
//   let newObject = {};
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].age > oldestUser) {
//       oldestUser = users[i].age;
//       newObject = users[i];
//     }
//   }
//   return newObject.name;
// }

// console.log(getOlderUserArray(allUsers));




// Вариант решения №2

// let allUsers = [
//   {name: 'Валя', age: 11},
//   {name: 'Таня', age: 24},
//   {name: 'Рома', age: 21},
//   {name: 'Надя', age: 34},
//   {name: 'Антон', age: 7}
// ]

// function getOlderUserArray(users){
//   let oldestUser = users[0];

//   for (let user of users) {
//     if (user.age > oldestUser.age) {
//       oldestUser = user;
//     }
//   }
//   return oldestUser.name;
// }

// console.log(getOlderUserArray(allUsers));
