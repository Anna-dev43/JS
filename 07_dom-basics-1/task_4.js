  let allStudents = [
    { name: 'Валя', age: 11 },
    { name: 'Таня', age: 24 },
    { name: 'Рома', age: 21 },
    { name: 'Надя', age: 34 },
    { name: 'Антон', age: 7 }
  ];

function getElement(studentInfo) {
  let ulElement = document.createElement('ul');

  for (let item of studentInfo) {
    let liElement = document.createElement('li');
    let h2Element = document.createElement('h2');
    let spanElement = document.createElement('span');

    h2Element.textContent = `${item.name}`
    spanElement.textContent = `возраст:${item.age}`

    ulElement.append(liElement);
    liElement.append(ulElement, spanElement);
  }
  document.body.append(ulElement);
}

let btn = document.createElement('button');
document.body.append(btn);
btn.textContent = 'Показать список';
btn.addEventListener('click', function() {
  getElement(allStudents);
})

