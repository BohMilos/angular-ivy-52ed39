import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  username: string = '';
  password: string = '';
  isHidden: boolean = true;

  student: Student = {
    name: '',
    surname: '',
    avg: 1,
    class: '',
    birth: new Date().toISOString().substring(0, 10),
    major: '',
    gender: '',
    disabled: false,
    info: '',
    lastEdit: new Date(),
  };

  studentList: Student[] = [];
  searchName: string = '';
  searchSurname: string = '';

  selectedStudent: Student | null = null;
  editStudentData: Student = {
    name: '',
    surname: '',
    avg: 1,
    class: '',
    birth: '',
    major: '',
    gender: '',
    disabled: false,
    info: '',
    lastEdit: new Date(),
  };

  login(): void {
    const expectedCredentials = [
      { username: 'MilosK', password: 'MK123' },
      { username: 'XY', password: 'XY123' },
    ];

    const isCredentialsValid = expectedCredentials.some(
      (cred) =>
        cred.username === this.username && cred.password === this.password
    );

    if (isCredentialsValid) {
      this.isHidden = false;
    } else {
      this.isHidden = true;
      alert('Nesprávne prihlasovacie údaje');
    }
  }

  logout(): void {
    this.isHidden = true;
  }

  onSubmit(): void {
    const newStudent: Student = {
      name: this.student.name,
      surname: this.student.surname,
      avg: this.student.avg,
      class: this.student.class,
      birth: this.student.birth,
      major: this.student.major,
      gender: this.student.gender,
      disabled: this.student.disabled,
      info: this.student.info,
      lastEdit: new Date(),
    };

    this.studentList.push(newStudent);
    this.student = {
      name: '',
      surname: '',
      avg: 1,
      class: '',
      birth: new Date().toISOString().substring(0, 10),
      major: '',
      gender: '',
      disabled: false,
      info: '',
      lastEdit: new Date(),
    };
  }

  onSearch(): void {
    const foundStudent = this.studentList.find(
      (student) =>
        student.name.toLowerCase() === this.searchName.toLowerCase() &&
        student.surname.toLowerCase() === this.searchSurname.toLowerCase()
    );

    if (foundStudent) {
      this.editStudentData = { ...foundStudent };
      this.selectedStudent = foundStudent;
    } else {
      alert('Žiak sa nenašiel');
    }
  }

  editStudent(): void {
    if (this.selectedStudent) {
      this.editStudentData = { ...this.selectedStudent };
    }
  }

  saveChanges(): void {
    if (this.selectedStudent) {
      for (const prop in this.editStudentData) {
        if (
          this.editStudentData.hasOwnProperty(prop) &&
          this.editStudentData[prop] !== ''
        ) {
          this.selectedStudent[prop] = this.editStudentData[prop];
        }
      }

      this.selectedStudent.lastEdit = new Date();
      this.selectedStudent = null;

      this.editStudentData = {
        name: '',
        surname: '',
        avg: 1,
        class: '',
        birth: '',
        major: '',
        gender: '',
        disabled: false,
        info: '',
        lastEdit: new Date(),
      };
    }
  }

  cancelEdit(): void {
    this.selectedStudent = null;

    this.editStudentData = {
      name: '',
      surname: '',
      avg: 1,
      class: '',
      birth: '',
      major: '',
      gender: '',
      disabled: false,
      info: '',
      lastEdit: new Date(),
    };
  }

  deleteStudent(): void {
    if (this.selectedStudent) {
      const index = this.studentList.indexOf(this.selectedStudent);
      if (index !== -1) {
        this.studentList.splice(index, 1);
        this.selectedStudent = null;

        this.editStudentData = {
          name: '',
          surname: '',
          avg: 1,
          class: '',
          birth: '',
          major: '',
          gender: '',
          disabled: false,
          info: '',
          lastEdit: new Date(),
        };
      }
    }
  }

  ngOnInit(): void {
    console.log('on init...');
    this.studentList = [
      {
        name: 'Ján',
        surname: 'Dolný',
        avg: 2.4,
        class: '3.E',
        birth: '2006-05-15',
        major: 'Elektronické komunikačné systémy',
        gender: 'Muž',
        disabled: false,
        info: 'Alergia - Peľ',
        lastEdit: new Date(),
      },
      {
        name: 'Alica',
        surname: 'Kováčová',
        avg: 4.5,
        class: '2.D',
        birth: '2007-03-22',
        major: 'Programovanie digitálnych technológií',
        gender: 'Žena',
        disabled: true,
        info: 'Trpí klaustrofóbiou',
        lastEdit: new Date(),
      },
      {
        name: 'Róbert',
        surname: 'Jaškovský',
        avg: 2.5,
        class: '1.C',
        birth: '2008-03-10',
        major: 'Sieťové a informačné technológie',
        gender: 'Iné',
        disabled: false,
        info: '',
        lastEdit: new Date(),
      },
    ];
  }
}

export interface Student {
  name: string;
  surname: string;
  avg?: number;
  class?: string;
  birth?: string;
  major?: string;
  gender?: string;
  info?: string;
  disabled?: boolean;
  lastEdit: Date;
}
