import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: 'admin-login.component.html',
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
   
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    try {
      const response = await this.authService.login(email, password);
      // Connexion réussie, gérer la redirection ou les actions nécessaires
      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: `Vous êtes maintenant connecté`,
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        this.router.navigate([response.url]);
      });
    } catch (error) {
      // Gérer l'erreur de connexion
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: 'Adresse e-mail ou mot de passe incorrect',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }

}
