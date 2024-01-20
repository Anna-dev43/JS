class Students {
  constructor(name, surename, lastname, birthData, startYear, faculty) {
    this.name = name;
    this.surename = surename;
    this.lastname = lastname;
    this.birthData = birthData;
    this.startYear = startYear;
    this.faculty = faculty;
  }

  get fio() {
    return this.surename + " " + this.name + " " + this.lastname;
  }

  getStudPeriod() {
    const currentTime = new Date();
    return currentTime.getFullYear() - this.startYear;
  }

  getBirthDataString() {
    console.log(this.birthData) 

    const yyyy = this.birthData.getFullYear();
    let mm = this.birthData.getMonth() + 1;
    let dd = this.birthData.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "." + mm + "." + yyyy;
  }
}

// Массив сотрудников
const stud = [
  new Students("Игорь", "Фролов", "Сергеевич", new Date(1992, 1, 21), 2015, "Физика"),
  new Students("Алена", "Белых", "Юрьевна", new Date(1995, 3, 15), 2020, "Химия"),
  new Students("Иван", "Ушаков", "Владимирович", new Date(1900, 10, 3), 2010, "Биология"),
];

const $studentsList = document.getElementById("students-list"),
  $studentsListTHAll = document.querySelectorAll(".studentsTable th");

let column = "fio",
  columnDir = true;

// Поличить TR сотрудника
function newStudentTR(student) {
  const $studentTR = document.createElement("tr"),
    $fioTD = document.createElement("td"),
    $birthDataTD = document.createElement("td"),
    $startYearTD = document.createElement("td"),
    $facultyTD = document.createElement("td");

  $fioTD.textContent = student.fio;
  $birthDataTD.textContent = student.getBirthDataString();
  $startYearTD.textContent = student.startYear + " (" + student.getStudPeriod() + " лет)";
  $facultyTD.textContent = student.faculty;

  $studentTR.append($fioTD);
  $studentTR.append($birthDataTD);
  $studentTR.append($startYearTD);
  $studentTR.append($facultyTD);

  return $studentTR;
}

// получить сортировку массива по параметрам
function getSortStudents(prop, dir) {
  const studCopy = [...stud];
  return studCopy.sort(function (studentA, studentB) {
    if (!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop])
      return -1;
  });
}

// Отрисовать
function render() {
  let studCopy = [...stud];

  studCopy = getSortStudents(column, columnDir);

  $studentsList.innerHTML = "";

  for (const student of studCopy) $studentsList.append(newStudentTR(student));
}

// События сотрировки
$studentsListTHAll.forEach((elment) => {
  elment.addEventListener("click", function () {
    column = this.dataset.column;
    columnDir = !columnDir;
    render();
  });
});

// Добавление
document
  .getElementById("add-student")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    stud.push(
      new Students(
        document.getElementById("input-name").value,
        document.getElementById("input-surename").value,
        document.getElementById("input-lastname").value,
        new Date(document.getElementById("input-birthData").value),
        Number(document.getElementById("input-startYear").value),
        document.getElementById("input-faculty").value
      )
    );

    render();
  });

render();
