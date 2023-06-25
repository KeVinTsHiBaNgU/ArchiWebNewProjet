import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  submitted = false;
  successMessage!: string; 
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  

    this.userService.getCurrentUser().subscribe(
      (response) => {
        const user = response?.data; // Vérifiez que la réponse contient un objet 'data' contenant les informations utilisateur
        if (user) {
          this.profileForm.patchValue({
            name: user.name,
            email: user.email
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    // Effectuer la mise à jour du profil de l'utilisateur
    const name = this.profileForm.value.name;
    const email = this.profileForm.value.email;
    const password = this.profileForm.value.password;

    // Appeler le service pour mettre à jour les informations de l'utilisateur
    this.userService.updateUserProfile(name, email, password)
    .subscribe(
      () => {
        // Réinitialiser le formulaire et afficher un message de succès
        this.profileForm.reset();
        this.submitted = false;
        this.successMessage = 'Les informations du compte ont été modifiées avec succès.';
      },
      error => {
        // Gérer les erreurs de mise à jour du compte
        this.errorMessage = 'Une erreur s\'est produite lors de la mise à jour du compte.';
      }
    );
  }
}
