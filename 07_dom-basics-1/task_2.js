let student = {
  name: 'Игорь',
  age: '17',
};

function createStudentCard(studentObj) {
  let nameTag = document.createElement('h2');
  let ageTag = document.createElement('span');
  let card = document.createElement('div')

  nameTag.textContent = studentObj.name;
  ageTag.textContent = `Возраст: ${studentObj.age} лет`;
  card.append(ageTag, nameTag);

  document.body.append(card);
}
createStudentCard(student);
