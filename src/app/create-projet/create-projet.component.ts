import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { ProjetService } from '../../../services/projet.service';
import { CompetenceService } from '../../../services/competence.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.css']
})
export class CreateProjetComponent implements OnInit {
  projetForm!: FormGroup;
  competences: any[] = []; // Remplacer 'any' par le type approprié pour les compétences
  

  constructor(
    private formBuilder: FormBuilder,
    private projetService: ProjetService,
    private competenceService: CompetenceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      competenceschoisie: this.formBuilder.array([]) // Utilisation de formBuilder.array()
    });

    this.competenceService.getAllCompetences().subscribe((data: any[]) => {
      this.competences = data;
     
    });
  }


 
  onSubmit() {
    if (this.projetForm.invalid) {
      return;
    }

    const formData = this.projetForm.value;
    const competencesSelectionnees = this.competences
      .filter((competence, index) => formData.competenceschoisie[index])
      .map(competence => competence._id);

    const projet = {
      nom: formData.nom,
      description: formData.description,
   
    };

    this.projetService.createProjet(projet).subscribe((createdProjet: any) => {
      const projetId = createdProjet._id; // Récupérer l'ID du projet créé
      // Traiter la réponse du serveur ou effectuer une action appropriée

      // Afficher une alerte avec SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Projet créé avec succès!',
        showConfirmButton: false,
        timer: 2000 // Durée de l'alerte en millisecondes (2 secondes)
      });

      // Rediriger vers "/view/projet" après 2 secondes
      setTimeout(() => {
        this.router.navigate(['/view/projet']);
      }, 2000);
    });
  }
}
