
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  courseId?: number;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      credits: [1, [Validators.required, Validators.min(1)]],
      teacher: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.courseId) {
      this.isEditMode = true;
      this.courseService.getCourse(this.courseId).subscribe(course => {
        if (course) {
          this.courseForm.patchValue(course);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData: Course = { ...this.courseForm.value };
      if (this.isEditMode && this.courseId) {
        courseData.id = this.courseId;
        this.courseService.updateCourse(courseData).subscribe(() => {
          this.router.navigate(['/courses']);
        });
      } else {
        this.courseService.addCourse(courseData).subscribe(() => {
          this.router.navigate(['/courses']);
        });
      }
    }
  }
}
