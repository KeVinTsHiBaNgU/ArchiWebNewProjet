
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService} from '../../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm!: FormGroup;
  name?: string;
  email?: string;
  password?: string;
  role?: string;


  constructor(private formBuilder: FormBuilder,private userService: UserService) {}
  
 

  onSubmit() {
    let user= {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "role": this.role
    }
    this.userService.createUser(user).subscribe(
      () => {
        Swal.fire({
          title: 'Utilisateur créé avec succès',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = '/admin/dashboard';
        });
      },
      error => {
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la création de l\'utilisateur', 'error');
        console.error(error);
      }
    );

    this.userForm.reset();
  }
}

