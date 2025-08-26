import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      grade: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.studentId) {
      this.isEditMode = true;
      this.studentService.getStudent(this.studentId).subscribe(student => {
        if (student) {
          // Format date for input type="date"
          const dateOfBirth = new Date(student.dateOfBirth);
          const formattedDate = dateOfBirth.toISOString().substring(0, 10);
          
          this.studentForm.patchValue({
            ...student,
            dateOfBirth: formattedDate
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData: Student = {
        ...this.studentForm.value,
        dateOfBirth: new Date(this.studentForm.value.dateOfBirth)
      };

      if (this.isEditMode && this.studentId) {
        studentData.id = this.studentId;
        this.studentService.updateStudent(studentData).subscribe(() => {
          this.router.navigate(['/students']);
        });
      } else {
        this.studentService.addStudent(studentData).subscribe(() => {
          this.router.navigate(['/students']);
        });
      }
    }
  }
}