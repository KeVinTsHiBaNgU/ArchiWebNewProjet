import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'; 
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-enseignant-dashboard',
  templateUrl: './enseignant-dashboard.component.html',
  styleUrls: ['./enseignant-dashboard.component.css']
})
export class EnseignantDashboardComponent {
  etudiants!: any[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getEtudiants(); // Appelez la méthode pour récupérer les étudiants lors de l'initialisation du composant
  }

  getEtudiants() {
    this.userService.getEtudiants().subscribe(data => {
      this.etudiants = data; // Stockez les étudiants récupérés dans la propriété
    });
  }

  onVoirProjet() {
    this.router.navigate(['/view/projet']);
  }
  
  onVoirCompetence() {
    this.router.navigate(['/view/competence']);
  }

}