let allStudents = [
  { name: 'Валя', age: 11 },
  { name: 'Таня', age: 24 },
  { name: 'Рома', age: 21 },
  { name: 'Надя', age: 34 },
  { name: 'Антон', age: 7 }
];

function createStudentCard (student) {
  let listItem = document.createElement('li');
  let studentName = document.createElement('h2');
  let studentYear = document.createElement('span');

  studentName.textContent = student.name;
  studentYear.textContent = `Возраст: ${student.age} лет`;

  listItem.append(studentName, studentYear);

  return listItem;
}

function createStudentsList(listArr) {
  let list = document.createElement('ul');
  list.style = "list-style: none";

  for (let obj of listArr) {
    let item = createStudentCard(obj);
    list.append(item);
  }

  document.body.append(list);
}

createStudentsList(allStudents);

let btn = document.createElement('button');

document.body.append(btn);
btn.textContent = 'Показать список';

btn.onclick = getElement(allStudents)



