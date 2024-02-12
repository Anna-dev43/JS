let studentCounter = 0;
class Student {
    constructor(data) {
            this.id = data.id || studentCounter++;
            this.surname = data.surname;
            this.name = data.name;
            this.lastname = data.lastname;
            this.birthday = data.birthday;
            this.studyStart = data.studyStart;
            this.faculty = data.faculty;
    }
}

class StudentsManager {
    list = [];
    searchList = [];

    searchQuery = {
      surname: '',
      birthday: '',
      studyStart: '',
      faculty: '',
    };

    addStudent(studentData) {
        this.list.push(new Student(studentData));
    }

    addStudents(dataList) {
      dataList.forEach(student => (this.addStudent(student)));
    }

    removeStudent(student) {
        const index = this.list.findIndex(item => item.id === student.id);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    sortBy(prop = 'surname') {
        this.list.sort(function (a,b) {
          if (a[prop] < b[prop]) return -1;
        });
        return this.list;
    }

    searchStudents(query) {
      this.searchQuery = query;
      this.searchList = this.list.filter(student => {
        let result = false;

        const tests = [
          query.surname === undefined || student.surname.toLowerCase().includes(query.surname.toLowerCase()),
          query.birthday === undefined || student.year.includes(query.birthday),
          query.studyStart === undefined || student.startYear.includes(query.studyStart),
          query.faculty === undefined || student.surname.toLowerCase().includes(query.faculty.toLowerCase()),
        ];
        return tests.every(item => item === true);
      });
      return this.searchList;
    }
}

export const studentManager = new StudentsManager();
// window.studentManager = studentManager;
