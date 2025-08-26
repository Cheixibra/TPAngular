
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(courses => this.courses = courses);
  }

  editCourse(course: Course) {
    this.router.navigate(['/courses/edit', course.id]);
  }

  deleteCourse(course: Course) {
    if (confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      this.courses = this.courses.filter(c => c.id !== course.id);
      // Ajoutez ici l'appel au service si vous souhaitez persister la suppression
    }
  }
}
