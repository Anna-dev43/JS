function createStudentCard(name, age, card) {
  let name = document.createElement('h1');
  let age = document.createElement('span');
  let card = document.createElement('div');
  card.prepend(name);
  card.prepend(age);
  name.textContent = name;
  age.textContent = `age : ${age} years old`;
  document.body.append(card);
}
createStudentCard('Igor, 17')
