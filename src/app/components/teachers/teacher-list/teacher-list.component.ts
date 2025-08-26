
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../models/teacher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(teachers => this.teachers = teachers);
  }

  editTeacher(teacher: Teacher) {
    this.router.navigate(['/teachers/edit', teacher.id]);
  }

  deleteTeacher(teacher: Teacher) {
    if (confirm('Voulez-vous vraiment supprimer cet enseignant ?')) {
      this.teachers = this.teachers.filter(t => t.id !== teacher.id);
      // Ajoutez ici l'appel au service si vous souhaitez persister la suppression
    }
  }
}
