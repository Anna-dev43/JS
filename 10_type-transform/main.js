// База данных
let listData = [{
  name: 'Олег',
  surename: 'Иванович',
  lastname: 'Мостин',
  age: 22,
  education: new Date(1992, 1, 21),
  faculty: 'Физика'
},
{
  name: 'Юлия',
  surename: 'Александровна',
  lastname: 'Воронина',
  age: 21,
  education: new Date(1995, 3, 15),
  faculty: 'Биология'
},
{
  name: 'Евгения',
  surename: 'Анатольевна',
  lastname: 'Ильина',
  age: 18,
  education: new Date(1900, 10, 3),
  faculty: 'Химия'
},
]

let sortColumnFlag = 'fio',
sortDirFlag = true

// Создание элементов
const $app = document.getElementById('app'),
      $addForm = document.getElementById('add-form'),
      $nameInp = document.getElementById('add-form__name-inp'),
      $surenameInp = document.getElementById('add-form__surename-inp'),
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

// Создание Tr одного пользователя
function createUserTr(oneUser) {
const $userTr = document.createElement('tr'),
  $userFIO = document.createElement('th'),
  $userAge = document.createElement('th'),
  $userBirthYear = document.createElement('th'),
  $userFaculty = document.createElement('th');

$userFIO.textContent = oneUser.fio
$userAge.textContent = oneUser.age
$userBirthYear.textContent = oneUser.birthYear
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

// Подготовка
for (const oneUser of copyListData) {
  oneUser.fio = oneUser.name + ' ' + oneUser.surename + ' ' + oneUser.lastname
  oneUser.birthYear = 2022 - oneUser.age
}

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

render(listData)

// Добавление
$addForm.addEventListener('submit', function(event) {
event.preventDefault()

// Валидация
if ($nameInp.value.trim() == "") {
  alert('Имя не введено!')
  return
}

if ($surenameInp.value.trim() == "") {
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

listData.push({
  name: $nameInp.value.trim(),
  surename: $surenameInp.value.trim(),
  lastname: $lastnameInp.value.trim(),
  age: parseInt($ageInp.value.trim()),
  faculty: $facultyInp.value.trim()
})

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
