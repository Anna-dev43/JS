function createStudentCard(name, age) {
  let nameEl = document.createElement('h1');
  let ageEl = document.createElement('span');
  let card = document.createElement('div');
  nameEl.textContent = name;
  ageEl.textContent = `age : ${age} years old`;
  card.append(nameEl, ageEl);
  document.body.append(card);
}

createStudentCard('Igor', 17);
