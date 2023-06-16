// import { Component, OnInit, Input } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { User } from '../../backend/models/User';

// @Component({
//   selector: 'app-user-modal',
//   templateUrl: 'user-modal.component.html',
//   styleUrls: ['user-modal.component.css']
// })
// export class UserModalComponent implements OnInit {
//   userForm!: FormGroup;
//   user: any = {};

//   constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) {}
  

//   ngOnInit() {
//     this.userForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//       role: ['', Validators.required]
//     });
//   }

//   initForm() {
//     this.userForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       role: ['', Validators.required]
//     });
//   }

//   addUser() {
//     if (this.userForm.valid) {
//       const newUser: User = {
//         name: this.userForm.value.name,
//         email: this.userForm.value.email,
//         password: this.userForm.value.password,
//         role: this.userForm.value.role
//       };

//       this.activeModal.close('success'); // Fermer la modal avec succès
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../backend/models/User';

@Component({
  selector: 'app-user-modal',
  templateUrl: 'user-modal.component.html',
  styleUrls: ['user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  userForm!: FormGroup;
  user: any = {};

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role,
        id_user: this.generateUserId() // Generate a unique user ID using a helper function (e.g., generateUserId())
      };

      // Pass the new user object to a service method for further processing (e.g., calling an API to create the user)
      // userService.createUser(newUser);

      // Reset the form after successful user creation
      this.userForm.reset();

      this.activeModal.close('success'); // Fermer la modal avec succès
    }
  }

  private generateUserId(): string {
    // Implement your logic to generate a unique user ID here
    // Example: Generate an 8-digit random number starting with "23"
    const randomId = '23' + Math.floor(Math.random() * 100000000);
    return randomId;
  }
}
