let studentObj = {
  name: 'Игорь',
  age: '17',
};

function createStudentCard(studentObj) {
  let nameTag = document.createElement('h2');
  let ageTag = document.createElement('span');
  let card = document.createElement('div')

  card.prepend(ageTag);
  card.prepend(nameTag);

  nameTag.textContent = studentObj.name;
  ageTag.textContent = `Возраст: ${student.age} лет`;

  document.body.append(card);
}
createStudentCard(studentObj);
