  let allStudents = [
    { name: 'Валя', age: 11 },
    { name: 'Таня', age: 24 },
    { name: 'Рома', age: 21 },
    { name: 'Надя', age: 34 },
    { name: 'Антон', age: 7 }
  ]

  function createStudentsList(listArr) {
    let ul = document.createElement('ul');
    ul.style = "list-style: none";

    let card = [];

    for (obj = 0; obj < listArr.length; obj++) {
      function createStudentsList() {
        let list = document.createElement('li');

        let studentName = document.createElement('h2');
        let studentYear = document.createElement('span');

        list.prepend(studentName);
        list.append(studentYear);

        studentName.textContent = listArr[obj].name;
        studentYear.textContent = `Возраст: ${listArr[obj].age} лет`;

        ul.append(list);
      }
      createStudentCard();
      card.push(obj);
    }
    document.body.append(ul);
    return card;
  }
  createStudentsList(allStudents);

