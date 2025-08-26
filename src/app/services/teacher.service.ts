import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachers: Teacher[] = [
    { id: 1, firstName: 'Claire', lastName: 'Bernard', email: 'claire.bernard@email.com', subject: 'Mathématiques' },
    { id: 2, firstName: 'Paul', lastName: 'Thomas', email: 'paul.thomas@email.com', subject: 'Physique' },
    { id: 3, firstName: 'Sophie', lastName: 'Robert', email: 'sophie.robert@email.com', subject: 'Français' }
  ];
  private nextId = 4;

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return of(this.teachers);
  }

  getTeacher(id: number): Observable<Teacher | undefined> {
    const teacher = this.teachers.find(t => t.id === id);
    return of(teacher);
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    teacher.id = this.nextId++;
    this.teachers.push(teacher);
    return of(teacher);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    const index = this.teachers.findIndex(t => t.id === teacher.id);
    if (index !== -1) {
      this.teachers[index] = teacher;
    }
    return of(teacher);
  }

  deleteTeacher(id: number): Observable<boolean> {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index !== -1) {
      this.teachers.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}