import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Mathématiques', description: 'Algèbre et géométrie', credits: 5, teacher: 'Mme Bernard' },
    { id: 2, name: 'Physique', description: 'Mécanique et thermodynamique', credits: 4, teacher: 'M. Thomas' },
    { id: 3, name: 'Français', description: 'Littérature et expression écrite', credits: 3, teacher: 'Mme Robert' }
  ];
  private nextId = 4;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourse(id: number): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course);
  }

  addCourse(course: Course): Observable<Course> {
    course.id = this.nextId++;
    this.courses.push(course);
    return of(course);
  }

  updateCourse(course: Course): Observable<Course> {
    const index = this.courses.findIndex(c => c.id === course.id);
    if (index !== -1) {
      this.courses[index] = course;
    }
    return of(course);
  }

  deleteCourse(id: number): Observable<boolean> {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}