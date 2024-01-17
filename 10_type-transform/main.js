let studentsList = [];

// Функция, создающая HTML-элемент для вывода одного студента в таблицу
function getStudentItem(studentObj) {
  const tableRow = document.createElement('tr');
  const nameCell = document.createElement('td');
  const birthdayCell = document.createElement('td');
  const startEducationCell = document.createElement('td');
  const facultyCell = document.createElement('td');
  const age = calculateAge(studentObj.birthday);
  const startYear = parseInt(studentObj.startEducation);

  // Добавить информацию о студенте в создание элементы HTML
  nameCell.textContent = `${studentObj.lastname} ${studentObj.name} ${studentObj.surname}`;
  birthdayCell.textContent = `${studentObj.birthday.split('-').reverse().join('.')} (${age} лет)`;
  startEducationCell.textContent = getEducationPeriod(startYear);
  facultyCell.textContent = studentObj.faculty;

  // Добавление созданных элементов HTML в строку таблицы
  tableRow.appendChild(nameCell)
  tableRow.appendChild(birthdayCell)
  tableRow.appendChild(startEducationCell)
  tableRow.appendChild(facultyCell)

  return tableRow;
};

// Функция, отображения таблицы со списком студентов
let studentArray = [];
function renderStudentsTable() {
  const tableBody = document.querySelector('#students-list'); // тело таблицы
  const fragment = document.createDocumentFragment(); // создание фрагмента для таблицы со списком студентов

  // Создание строк таблицы с данными студентами, в том числе отфильтрованных, и дабавление их во фрагмент

  const nameFilter = filterForm.elements['name-filter'].value.trim();
  const facultyFilter = filterForm.elements['faculty-filter'].value.trim();
  const startEducFilter = filterForm.elements['start-educ-filter'].value.trim();
  const finishEducFilter = filterForm.elements['finish-educ-filter'].value.trim();
  const filters = {
    name: nameFilter,
    faculty: facultyFilter,
    startEducation: startEducFilter,
    finishEducation: finishEducFilter
  };
  studentArray = filterStudentsArray(studenstList, filters);
  studentArray.forEach(student => {
    const rowContent = getStudentItem(student);
    fragment.appendChild(rowContent);
  });

// Очистка тела таблицы и добавление фрагмента со строками таблицы
  tableBody.innerHTML = '';
  tableBody.appendChild(fragment);

// Ограничение максимальной даты рождения на текущую дату
  const birthdayInput = document.getElementById('birthday');
  const maxDate = new Date().toISOString().split('T')[0];
  birthdayInput.setAttribute('max', maxDate);

// Ограничение максимального года начала обучения на текущий год
  const startEducationInput = document.getElementById('startEducation');
  const maxYear = new Date().getFullYear();
  startEducationInput.setAttribute('max', maxYear);

// Добавление обработчиков событий на загаловки таблицы
  const nameHeader = document.querySelector('#name-header');
  nameHeader.addEventListener('click', () => {
    sortStudentsByName(studentsList);
    renderStudentsTable();
  });

  const birthdayHeader = document.querySelector('#birthday-header');
  birthdayHeader.addEventListener('click', () => {
    sortStudentsByBirthday(studentsList);
    renderStudentsTable();
  });

  const startEducationHeader = document.querySelector('#start__education-header');
  startEducationHeader.addEventListener('click', () => {
    sortStudentsByBirthday(studentsList);
    renderStudentsTable();
  });

  const facultyHeader = document.querySelector('#facultyHeader');
  facultyHeader.addEventListener('click', () => {
    sortStudentsByBirthday(studentsList);
    renderStudentsTable();
  });
};

// К форме добавления студента добавлен слушатель события отправки формы, в которой будет проверка введенных данных
  const addStudentForm = document.querySelector('#add-student-form');
  addStudentForm.addEventListener('submit', (event) => {
    event.preventDefault();

  const surname = addStudentForm.elements.surname.value.trim();
  const name = addStudentForm.elements.name.value.trim();
  const lastname = addStudentForm.elements.lastname.value.trim();
  const birthday = addStudentForm.elements.birthday.value.trim();
  const startEducation = addStudentForm.elements.startEducation.value.trim();
  const faculty = addStudentForm.elements.faculty.value.trim();

// Если проверка пройдет успешно, добавить объект с данными студентов в массив и запустить функцию отрисовки таблицы
    if (surname && name && lastname && birthday && startEducation && faculty) {
      const newStudent = {
        surname,
        name,
        lastname,
        birthday,
        startEducation,
        faculty
      };

    studentsList.push(newStudent);
    localStorage.setItem('studentsList', JSON.stringify(studentsList));
    renderStudentsTable();
    addStudentForm.requestFullscreen();
    }
});


// Фильтрация

// Function to render filtered students
function renderFilteredStudentsTable(filterStudents) {
  const tableBody = document.querySelector('#students-list');
  const fragment = document.createDocumentFragment();

  // Clearing table content
  tableBody.innerHTML = '';

  filterStudents.forEach(student => {
    const rowContent = getStudentItem(student);
    fragment.appendChild(rowContent);
  });

  tableBody.appendChild(fragment);
}

// Function to filter students based on criteria
function filteredStudentsTable(studenstList) {
  let filteredStudentsList = [...studenstList];
  const nameFilter = document.getElementById('name-filter').value.trim();
  const facultyFilter = document.getElementById('faculty-filter').value.trim();
  const startEducFilter = document.getElementById('star-educ-filter').value.trim();
  const finishEducFilter = document.getElementById('finish-educ-filter').value.trim();

if (!!nameFilter) filteredStudentsList = filterStudentsArray(filteredStudentsList, 'name', nameFilter);
if (!!facultyFilter) filteredStudentsList = filterStudentsArray(filteredStudentsList, 'faculty', facultyFilter);
if (!!startEducFilter) filteredStudentsList = filterStudentsArray(filteredStudentsList, 'startEducation',startEducFilter);
if (!!finishEducFilter) filteredStudentsList = filterStudentsArray(filteredStudentsList, 'finishEducation', finishEducFilter);

return filteredStudentsList;
}

function sortStudentsTable(studenstList) {
  let sortedStudentsList = [...studenstList];
  const tableHeaders = document.getElementsByClassName('table__header-title');
  for(const tableHeader of tableHeaders) {
    if(tableHeader.classList.contains('sorted')) {
      sortedStudentsList = sortStudents(studenstList, bindSortValues(tableHeader.id),true);
    }
  }
  return sortedStudentsList;
}


