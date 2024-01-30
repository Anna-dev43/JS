// База данных
let listData = [{
  name: 'Олег',
  surname: 'Мостин',
  lastname: 'Иванович',
  birthday: '1992-01-01',
  studyStart: 2016,
  faculty: 'Физика'
},
{
  name: 'Юлия',
  surname: 'Воронина',
  lastname: 'Александровна',
  birthday: '1995-03-15',
  studyStart: 2017,
  faculty: 'Биология'
},
{
  name: 'Евгения',
  surname: 'Ильина',
  lastname: 'Анатольевна',
  birthday: '1998-10-03',
  studyStart: 2018,
  faculty: 'Химия'
},
]

let sortColumnFlag = 'fio',
sortDirFlag = true

// Создание элементов
const $app = document.getElementById('app'),
      $addForm = document.getElementById('add-form'),
      $nameInp = document.getElementById('add-form__name-inp'),
      $surnameInp = document.getElementById('add-form__surname-inp'),
      $lastnameInp = document.getElementById('add-form__lastname-inp'),
      $ageInp = document.getElementById('add-form__age-inp'),
      $educationInp = document.getElementById('add-form__education-inp'),
      $facultyInp = document.getElementById('add-form__faculty-inp'),
      $sortFIOBtn = document.getElementById('sort__fio'),
      $sortAgeBtn = document.getElementById('sort__age'),

      $filterForm = document.getElementById('filter-form'),
      $fioFilterInp = document.getElementById('filter-form__fio-inp'),
      $facultyFilterInp = document.getElementById('filter-form__faculty-inp'),

      $table = document.createElement('table'),
      $tableHead = document.createElement('thead'),
      $tableBody = document.createElement('tbody'),

      $tableHeadTr = document.createElement('tr'),
      $tableHeadThFIO = document.createElement('th'),
      $tableHeadThAge = document.createElement('th'),
      $tableHeadThEducation = document.createElement('th'),
      $tableHeadThFaculty = document.createElement('th');

      $table.classList.add('table')

      $tableHeadThFIO.textContent = 'ФИО'
      $tableHeadThAge.textContent = 'Возраст'
      $tableHeadThEducation.textContent = 'Начало обучения'
      $tableHeadThFaculty.textContent = 'Факультет'

      $tableHeadTr.append($tableHeadThFIO)
      $tableHeadTr.append($tableHeadThAge)

      $tableHeadTr.append($tableHeadThEducation)
      $tableHeadTr.append($tableHeadThFaculty)

      $tableHead.append($tableHeadTr)
      $table.append($tableHead)
      $table.append($tableBody)
      $app.append($table)

function preparesStudentObj(student) {
  const studentBirthDate = new Date(student.birthday);
  const currentDate = new Date();

  const studentBirthYear = studentBirthDate.getFullYear();
  const currentYear = currentDate.getFullYear();
  const studyEnd = Number(student.studyStart) + 4;

  const course = currentYear < studyEnd ? `${currentYear - Number(student.studyStart)} курс` : 'Закончил';

  return {
    ...student,
    fio: `${student.surname} ${student.name} ${student.lastname}`,
    age: currentYear - studentBirthYear,
    studyEnd,
    course,
    birthDate: studentBirthDate
  }
}

function preparesStudentsArray() {
  listData = listData.map((obj) => {
    return preparesStudentObj(obj);
  })
}

// Создание Tr одного пользователя
function createUserTr(oneUser) {
const $userTr = document.createElement('tr'),
  $userFIO = document.createElement('th'),
  $userAge = document.createElement('th'),
  $userBirthYear = document.createElement('th'),
  $userFaculty = document.createElement('th');

$userFIO.textContent = oneUser.fio
$userAge.textContent = `${oneUser.birthDate.getDate()}.${oneUser.birthDate.getMonth()}.${oneUser.birthDate.getFullYear()} (${oneUser.age} лет)`
$userBirthYear.textContent = `${oneUser.studyStart} - ${oneUser.studyEnd} (${oneUser.course})`
$userFaculty.textContent = oneUser.faculty

$userTr.append($userFIO)
$userTr.append($userAge)
$userTr.append($userBirthYear)
$userTr.append($userFaculty)

return $userTr
}

// Фильтрация
function filter(arr, prop, value) {
return arr.filter(function(oneUser) {
  if (oneUser[prop].includes(value.trim())) return true
});
}

// Рендер
function render(arrData) {
$tableBody.innerHTML = '';
let copyListData = [...arrData]

/*// Подготовка
for (const oneUser of copyListData) {
  oneUser.fio = oneUser.name + ' ' + oneUser.surname + ' ' + oneUser.lastname
  oneUser.birthYear = 2022 - oneUser.age
}*/

console.log(copyListData);

// Сортировка
copyListData = copyListData.sort(function(a, b) {
  console.log(a, b);
  let sort = a[sortColumnFlag] < b[sortColumnFlag]
  if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
  return sort ? -1 : 1
})

console.log(copyListData);

// Фильтрация
if ($fioFilterInp.value.trim() !== "") {
  copyListData = filter(copyListData, 'fio', $fioFilterInp.value)
}

if ($facultyFilterInp.value.trim() !== "") {
  copyListData = filter(copyListData, 'faculty', $facultyFilterInp.value)
}

// Отрисовка
for (const oneUser of copyListData) {
  const $newTr = createUserTr(oneUser)
  $tableBody.append($newTr)
}
}

preparesStudentsArray();
render(listData)

// Добавление
$addForm.addEventListener('submit', function(event) {
event.preventDefault()

// Валидация
if ($nameInp.value.trim() == "") {
  alert('Имя не введено!')
  return
}

if ($surnameInp.value.trim() == "") {
  alert('Отчество не введено!')
  return
}

if ($lastnameInp.value.trim() == "") {
  alert('Фамилия не введена!')
  return
}

if ($ageInp.value.trim() == "") {
  alert('Возраст не введен!')
  return
}

const preparedStudent = preparesStudentObj({
    name: $nameInp.value.trim(),
    surname: $surnameInp.value.trim(),
    lastname: $lastnameInp.value.trim(),
    birthday: parseInt($ageInp.value.trim()),
    studyStart: '',
    faculty: $facultyInp.value.trim()
});

listData.push(preparedStudent)

render(listData)
})

// Клики сортировки
$sortFIOBtn.addEventListener('click', function() {
sortColumnFlag = 'fio'
sortDirFlag = !sortDirFlag
render(listData)
})

$sortAgeBtn.addEventListener('click', function() {
sortColumnFlag = 'age'
sortDirFlag = !sortDirFlag
render(listData)
})

// Фильтр
$filterForm.addEventListener('submit', function(event) {
event.preventDefault()
})

$fioFilterInp.addEventListener('input', function() {
render(listData)
})
$facultyFilterInp.addEventListener('input', function() {
render(listData)
})
