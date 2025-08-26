import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@email.com', dateOfBirth: new Date(2000, 0, 15), grade: 'Terminale' },
    { id: 2, firstName: 'Marie', lastName: 'Martin', email: 'marie.martin@email.com', dateOfBirth: new Date(2001, 5, 22), grade: 'Première' },
    { id: 3, firstName: 'Pierre', lastName: 'Durand', email: 'pierre.durand@email.com', dateOfBirth: new Date(2002, 8, 10), grade: 'Seconde' }
  ];
  private nextId = 4;

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    // Simulation d'une API
    return of(this.students);
  }

  getStudent(id: number): Observable<Student | undefined> {
    const student = this.students.find(s => s.id === id);
    return of(student);
  }

  addStudent(student: Student): Observable<Student> {
    student.id = this.nextId++;
    this.students.push(student);
    return of(student);
  }

  updateStudent(student: Student): Observable<Student> {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
    }
    return of(student);
  }

  deleteStudent(id: number): Observable<boolean> {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}