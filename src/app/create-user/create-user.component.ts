
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../backend/models/User';
import { UserService} from '../../../services/user.service';


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
    this.userService.createUser(user).subscribe(() => {
      // Traiter la réponse du serveur ou effectuer une action appropriée
    });
    this.userForm.reset();
    console.log(user);
  }
}

