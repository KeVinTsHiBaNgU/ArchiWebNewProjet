import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service'; 

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {

  userForm!: FormGroup;
  users: any[] = [];

  constructor(private userService: UserService, private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: any[]) => {
      // Filtrer les utilisateurs pour exclure l'administrateur
      this.users = data.filter(user => user.role !== 'admin');
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userData = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
    };
  }

  
  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      // Filtrer les utilisateurs par rôle (enseignant et étudiant)
      this.users = users.filter((user) => user.role === 'teacher' || user.role === 'student');
    });
  }

  logout() {
    this.authService.logout(); // Appeler la méthode logout() du service AuthService
  }

}
