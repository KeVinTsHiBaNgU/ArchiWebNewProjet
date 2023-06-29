import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service'; 
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {

  userForm!: FormGroup;
  users: any[] = [];

  constructor(private userService: UserService, private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getUsers();
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


  deleteUser(userId: string) {
    Swal.fire({
      title: 'Supprimer utilisateur',
      text: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(() => {
          Swal.fire({
            title: 'Utilisateur supprimé',
            text: 'L\'utilisateur a été supprimé avec succès',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          this.getUsers(); 
        });
      }
    });
  }
  

  

  logout() {
    this.authService.logout(); // Appeler la méthode logout() du service AuthService
  }

}
