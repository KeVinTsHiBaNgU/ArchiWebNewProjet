import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'; 


@Component({
  selector: 'app-enseignant-dashboard',
  templateUrl: './enseignant-dashboard.component.html',
  styleUrls: ['./enseignant-dashboard.component.css']
})
export class EnseignantDashboardComponent {
  etudiants!: any[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getEtudiants(); // Appelez la méthode pour récupérer les étudiants lors de l'initialisation du composant
  }

  getEtudiants() {
    this.userService.getEtudiants().subscribe(data => {
      this.etudiants = data; // Stockez les étudiants récupérés dans la propriété
    });
  }
}