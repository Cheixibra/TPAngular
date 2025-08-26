
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  teacherForm: FormGroup;
  isEditMode = false;
  teacherId?: number;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.teacherForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.teacherId) {
      this.isEditMode = true;
      this.teacherService.getTeacher(this.teacherId).subscribe(teacher => {
        if (teacher) {
          this.teacherForm.patchValue(teacher);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      const teacherData: Teacher = { ...this.teacherForm.value };
      if (this.isEditMode && this.teacherId) {
        teacherData.id = this.teacherId;
        this.teacherService.updateTeacher(teacherData).subscribe(() => {
          this.router.navigate(['/teachers']);
        });
      } else {
        this.teacherService.addTeacher(teacherData).subscribe(() => {
          this.router.navigate(['/teachers']);
        });
      }
    }
  }
}
