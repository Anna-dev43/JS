document.addEventListener("DOMContentLoaded", async function () {
  // База данных
  let listData = [
    {
      name: "Олег",
      surname: "Мостин",
      lastname: "Иванович",
      birthday: "1992-01-01",
      studyStart: 2016,
      faculty: "Физика",
    },
    {
      name: "Юлия",
      surname: "Воронина",
      lastname: "Александровна",
      birthday: "1995-03-15",
      studyStart: 2017,
      faculty: "Биология",
    },
    {
      name: "Евгения",
      surname: "Ильина",
      lastname: "Анатольевна",
      birthday: "1998-10-03",
      studyStart: 2018,
      faculty: "Химия",
    },
  ];

  let sortColumnFlag = "fio",
    sortDirFlag = true;

  // Создание элементов
  const $app = document.getElementById("app"),
    $addForm = document.getElementById("add-form"),
    $nameInp = document.getElementById("add-form__name-inp"),
    $surnameInp = document.getElementById("add-form__surname-inp"),
    $lastnameInp = document.getElementById("add-form__lastname-inp"),
    $birthdayInp = document.getElementById("add-form__birthday-inp"),
    $studyStartInp = document.getElementById("add-form__studyStart-inp"),
    $facultyInp = document.getElementById("add-form__faculty-inp"),
    $createButton = document.getElementById("createButton");

    ($sortFIOBtn = document.getElementById("sort__fio")),
    ($sortBirthdayBtn = document.getElementById("sort__birthday")),
    ($sorFacultyBtn = document.getElementById("sort__faculty")),
    ($sortStudyStartBtn = document.getElementById("sort__studyStart")),

    ($filterForm = document.getElementById("filter-form")),
    ($fioFilterInp = document.getElementById("filter-form__fio-inp")),
    ($facultyFilterInp = document.getElementById("filter-form__faculty-inp")),
    ($studyStartFilterInp = document.getElementById("filter-form__studyStart-inp")),
    ($studyEndFilterInp = document.getElementById("filter-form__studyEnd-inp")),

    ($table = document.createElement("table")),
    ($tableHead = document.createElement("thead")),
    ($tableBody = document.createElement("tbody")),
    ($tableHeadTr = document.createElement("tr")),
    ($tableHeadThFIO = document.createElement("th")),
    ($tableHeadThBirthday = document.createElement("th")),
    ($tableHeadThStudyStart = document.createElement("th")),
    ($tableHeadThFaculty = document.createElement("th"));
    $tableHeadThButton = document.createElement("th");

  $table.classList.add("table");

  $tableHeadThFIO.textContent = "ФИО";
  $tableHeadThBirthday.textContent = "Возраст";
  $tableHeadThStudyStart.textContent = "Начало обучения";
  $tableHeadThFaculty.textContent = "Факультет";
  $tableHeadThButton.textContent = "Удаление студента";

  $tableHeadTr.append($tableHeadThFIO);
  $tableHeadTr.append($tableHeadThBirthday);

  $tableHeadTr.append($tableHeadThStudyStart);
  $tableHeadTr.append($tableHeadThFaculty);
  $tableHeadTr.append($tableHeadThButton);

  $tableHead.append($tableHeadTr);
  $table.append($tableHead);
  $table.append($tableBody);
  $app.append($table);

  function preparesStudentObj(student) {
    const studentBirthDate = new Date(student.birthday);
    const currentDate = new Date();

    const studentBirthYear = studentBirthDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const studyEnd = Number(student.studyStart) + 4;

    const course =
      currentYear < studyEnd
        ? `${currentYear - Number(student.studyStart)} курс` : "Закончил";

    return {
      ...student,
      fio: `${student.surname} ${student.name} ${student.lastname}`,
      age: currentYear - studentBirthYear,
      studyEnd,
      course,
      birthDate: studentBirthDate,
    };
  }

  function preparesStudentsArray() {
    listData = listData.map((obj) => {
      return preparesStudentObj(obj);
    });
  }

  // проверка списка на сервере
  async function loadStudentList() {
    const response = await fetch("http://localhost:3000/api/students");
    const data = await response.json();
    console.log(data);
    return data;
  }

  // Создание Tr одного пользователя
  function createUserTr(oneUser) {
    const $userTr = document.createElement("tr"),
      $userFIO = document.createElement("td"),
      $userStudyStart = document.createElement("td"),
      $userBirthYear = document.createElement("td"),
      $userFaculty = document.createElement("td");
      $userButton = document.createElement("td");

    $userTr.classList.add("class");

    $userFIO.textContent = oneUser.fio;
    $userStudyStart.textContent = `${oneUser.birthDate.getDate()}.${oneUser.birthDate.getMonth()}.${oneUser.birthDate.getFullYear()} (${oneUser.age} лет)`;
    $userBirthYear.textContent = `${oneUser.studyStart} - ${oneUser.studyEnd} (${oneUser.course})`;
    $userFaculty.textContent = oneUser.faculty;
    $userButton.textContent = oneUser.button;

    $userTr.append($userFIO);
    $userTr.append($userStudyStart);
    $userTr.append($userBirthYear);
    $userTr.append($userFaculty);
    $userTr.append($userButton);

    $userButton.classList.add("btn-class");
    $userButton.textContent = "Удалить";
    $userButton.addEventListener("click", function () {
      if (confirm("Вы уверены?")) {
        $userTr.remove();
        fetch(`http://localhost:3000/api/students/${oneUser.id}`, {
        method: "DELETE",
      })
      }

      const index = listData.findIndex((obj) => obj.id === oneUser.id);
      listData.splice(index, 1)
    });

    // Функция удаления студента
    let buttonTd = document.createElement("button");

    buttonTd.textContent = "Удалить";
    buttonTd.classList.add("btn_delete");

    buttonTd.addEventListener('click', function() {

      render(listData);
    });

    return $userTr;
  }

  // Фильтрация
  function filter(arr, prop, value) {
    if (value.trim === "") {
      return arr;
    }

    return arr.filter(function (oneUser) {
      if (String(oneUser[prop]).includes(value.trim())) return true;
    });
  }

  // Рендер
  function render(arrData) {
    $tableBody.textContent = "";

    // Отрисовка
    for (const oneUser of arrData) {
      const $newTr = createUserTr(oneUser);
      $tableBody.append($newTr);
    }
  }

  async function getStudentTable() {
    listData = await loadStudentList();
    preparesStudentsArray();
    render(listData);
  }

  getStudentTable();

  function clearInputs() {
    $nameInp.value = "";
    $surnameInp.value = "";
    $lastnameInp.value = "";
    $studyStartInp.value = "";
    $birthdayInp.value = "";
    $facultyInp.value = "";
  }

  // Добавление
  $addForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!validation(this)) {
      return;
    }

    // Функция клика кнопки, инпутов, а так же создания нового студента и добавления его в массив
      let newStudentData = {
        surname: `${$surnameInp.value}`,
        name: `${$nameInp.value}`,
        lastname: `${$lastnameInp.value}`,
        birthday: `${$birthdayInp.value}`,
        studyStart: Number($studyStartInp.value),
        faculty: `${$facultyInp.value}`,
      }

      // функция сохранения объекта на сервер
      const serverData = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        body: JSON.stringify(newStudentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const studentData = await serverData.json();
      listData.push(preparesStudentObj(studentData));

      clearInputs();
      render(listData);

      $tableBody.innerHTML = "";

    render(listData);

    $addForm.reset();
  });

  // Валидация
  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement("label");

    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;

    parent.classList.add("error");

    parent.append(errorLabel);
  }

  function removeError(input) {
    const parent = input.parentNode;
    const error = parent.querySelector(".error-label");
    parent.classList.remove("error");
    error?.remove();
  }

  function validation(form) {
    let result = true;
    const allInput = form.querySelectorAll("input");

    for (const input of allInput) {
      if (input.value.trim() === "") {
        console.log("Ошибка поля");
        createError(input, "Поле не заполнено!");
        result = false;
      } else {
        removeError(input);
      }
    }

    return result;
  }

  function sortStudents(arrData) {
    let copyListData = [...arrData];

    // Сортировка
    copyListData = copyListData.sort(function (a, b) {
      console.log(a, b);
      let sort = a[sortColumnFlag] < b[sortColumnFlag];
      if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag];
      return sort ? -1 : 1;
    });

    return copyListData;
  }

  // Клики сортировки
  $sortFIOBtn.addEventListener("click", function () {
    sortColumnFlag = "fio";
    sortDirFlag = !sortDirFlag;
    const sorteArr = sortStudents(listData);
    render(sorteArr);
  });

  $sortBirthdayBtn.addEventListener("click", function () {
    sortColumnFlag = "birthday";
    sortDirFlag = !sortDirFlag;
    const sorteArr = sortStudents(listData);
    render(sorteArr);
  });

  $sorFacultyBtn.addEventListener("click", function () {
    sortColumnFlag = "faculty";
    sortDirFlag = !sortDirFlag;
    const sorteArr = sortStudents(listData);
    render(sorteArr);
  });

  $sortStudyStartBtn.addEventListener("click", function () {
    sortColumnFlag = "studyStar";
    sortDirFlag = !sortDirFlag;
    const sorteArr = sortStudents(listData);
    render(sorteArr);
  });

  // Фильтр
  $filterForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  $fioFilterInp.addEventListener("input", function () {
    const filtereData = filter(listData, "fio", $fioFilterInp.value);
    render(filtereData);
  });

  $facultyFilterInp.addEventListener("input", function () {
    const filtereData = filter(listData, "faculty", $facultyFilterInp.value);
    render(filtereData);
  });

  $studyEndFilterInp.addEventListener("input", function () {
    const filtereData = filter(listData, "studyEnd", $studyEndFilterInp.value);
    render(filtereData);
  });

  $studyStartFilterInp.addEventListener("input", function () {
    const filtereData = filter(listData, "studyStart", $studyStartFilterInp.value);
    render(filtereData);
  });
});
