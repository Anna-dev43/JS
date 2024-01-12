(function () { //Общая функция

  let saveObjects = []; // создаем массив дел

  let keyPage = null; // создаем переменную для аргумента названия страницы

  function saveArrLocal(arrLocal, keyLocal) { // сохраняем массив с делами локально
    localStorage.setItem(keyLocal, JSON.stringify(arrLocal));
  }

  function createAppTitle(title) { // Функция создания заголовка
    let appTitle = document.createElement('h2'); // Создаем заголовок <h2>
    appTitle.innerHTML = title; // Приравниваем заголовку аргумент
    return appTitle; // Возвращаем заголовок в функцию
  }

  function createTodoItemForm() { // Функция создания элементов формы
    let form = document.createElement('form'); // Создание формы
    let input = document.createElement('input'); // Создание строки ввода
    let buttonWrapper = document.createElement('div'); // Создание дива для кнопки через бустрап
    let button = document.createElement('button'); // Создание кнопки

    form.classList.add('input-group', 'mb-3'); // Добавляем классы и стили форме
    input.classList.add('form-control'); // Добавляем классы и стили полю ввода
    input.placeholder = 'Введите название нового дела'; // Добавляем надпись в поле ввода
    button.classList.add('btn', 'btn-primary'); // Добавляем классы и стили кнопке
    button.textContent = 'Добавить дело'; // Добавляем надпись кнопке
    button.setAttribute('disabled', true); //создаем атрибут disabled для кнопки при загрузке страницы

    input.oninput = function () { // функция для активации кнопки
      if (input.value.length <= 0) { //если в поле ввода ничего нет то кнопка не активна
        button.setAttribute('disabled', true); //задаем атрибут disabled для кнопки при загрузке страницы
      } else {
        button.removeAttribute('disabled'); // если не выполнено условие то убираем атрибут disable и активируем кнопку
      }
    }

    buttonWrapper.append(button); // Добавляем кнопку в див wrapper
    form.append(input); // Добавляем строку ввода в форму
    form.append(buttonWrapper); // добавляем див wrappper в форму

    return { // Возвращаем форму, строку ввода и кнопку в функцию
      form,
      input,
      button,
    };
  }

  function createTodoList() { // Функция создания списка
    let list = document.createElement('ul'); // Создаем список
    list.classList.add('list-group'); // Добавляем классы списку
    return list; // Возвращаем список в функцию
  }

  function createTodoItem(name, done, id) { // функция создания дела
    let item = document.createElement('li'); // Создаем элемент списка

    let buttonGroup = document.createElement('div'); // Создаем див
    let doneButton = document.createElement('button'); // Создаем кнопку готово
    let deleteButton = document.createElement('button'); //Создаем кнопку удалить

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); // задаем классы и стили элементу списка

    if (done) { //сохраняем делу статус выполнено с помощью класса
      item.classList.add('list-group-item-success');
    };

    item.textContent = name; // задаем текст, без тегов

    buttonGroup.classList.add('btn-group', 'btn-group-sm'); // задаем классы и стили для дива с кнопоками
    doneButton.classList.add('btn', 'btn-success'); // задаем классы и стили для кнопки готово
    doneButton.textContent = 'Готово'; // пишем текст в кнопке готово
    deleteButton.classList.add('btn', 'btn-danger'); // задаем классы и стили для кнопки удалить
    deleteButton.textContent = 'Удалить'; // пишем текст в кнопке удалить

    doneButton.addEventListener('click', function () { // функция клика на кнопку готово
      item.classList.toggle('list-group-item-success'); // добавления класса и стилей кнопке готово
      let todo = saveObjects.find((obj) => obj.id === id);
      todo.done = !todo.done; // меняем false на true
      saveArrLocal(saveObjects, keyPage); //добавляем в локальное хранилище
    });
    deleteButton.addEventListener('click', function () { // функция клика на кнопку удалить
      if (confirm('Вы уверены?')) { // если кнопка нажата, то будет задан вопрос пользователю Вы уверены с возможностью выбора да или нет
        item.remove(); // если выбрано да, удалит объект, если выбрано нет, оставит все без изменений
        let todoIndex = saveObjects.findIndex((obj) => obj.id === id); // метод поиска в массиве дела по свойству
        saveObjects.splice(todoIndex, 1); //удаляем объект тз массива
        saveArrLocal(saveObjects, keyPage); //добавляем в локальное хранилище
        console.log(saveObjects);
      }
    });

    buttonGroup.append(doneButton); // добавляем кнопку готово в див с кнопками
    buttonGroup.append(deleteButton); // добавляем кнопку удалить в див с кнопками
    item.append(buttonGroup); // добавляем див с кнопками в li элемент списка

    return { // возвращаем див и кнопки в функцию
      item,
      doneButton,
      deleteButton,
    };
  }

  function createId(arrObj) { // функция для поиска максимального числа массива и присвоения ему порядкового номера
    let maxNumber = 0;

    for (const objTodo of arrObj) { //ищем максимальный id в массиве, добавляем ему 1 и возвращаем обратно
      if (objTodo.id > maxNumber) {
        maxNumber = objTodo.id
      }
    }
    return maxNumber + 1;
  }

  function createTodoApp(container, title = 'Список дел', listName) { // общая функция для работоспособности кнопок
    keyPage = listName;
    let todoAppTitle = createAppTitle(title); // создаем переменную с функцией заголовка
    let todoItemForm = createTodoItemForm(); // создаем переменную с функцией создания формы
    let todoList = createTodoList(); // создаем переменную с функцией создания списка

    container.append(todoAppTitle); // добавляем в общий контейнер заголовок
    container.append(todoItemForm.form); // добавляем в общий контейнер форму . ставим так как добавляем элемент

    let searchArrLocal = JSON.parse(localStorage.getItem(keyPage)); //переменная для получения данных с локального сервера
    if (searchArrLocal) {
      saveObjects = searchArrLocal;
    };

    for (const item of saveObjects) { //цикл создания разметки из локального хранилища
      const localItem = createTodoItem(item.name, item.done, item.id).item;
      todoList.append(localItem);
    }

    container.append(todoList); // добавляем в общий контейнер список

    todoItemForm.form.addEventListener('submit', function (e) { // функция для нажатия кнопок

      e.preventDefault(); // нужно, чтобы можно было создавать через клавиатуру

      if (!todoItemForm.input.value) { // если в строке есть надпись и нажат ентер
        return; // возвращаем в функцию
      }

      let inputValue = todoItemForm.input.value; // переменная для действия кнопок готово и удалить

      let objectTodo = { //создаем объект для массива
        name: inputValue,
        done: false,
        id: createId(saveObjects),
      };

      let todoItem = createTodoItem(inputValue, false, objectTodo.id); // функция действий кнопок готово и удалить

      saveObjects.push(objectTodo); //пушим объект в массив
      saveArrLocal(saveObjects, keyPage); //добавляем в локальный массив
      console.log(saveObjects);

      todoList.append(todoItem.item); // добавляем новое дело в список

      todoItemForm.button.disabled = true; //отключаем кнопку после создания дела

      todoItemForm.input.value = ''; // по умолчанию поле ввода пустое
    });
  }

  window.createTodoApp = createTodoApp;
})();

