import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompetenceService } from '../../../services/competence.service';
import { ProjetService } from '../../../services/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.css']
})
export class EditProjetComponent implements OnInit {
  projetForm!: FormGroup;
  projetId!: string;
  competences: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router,
    private competenceService: CompetenceService,
  ) { }

  ngOnInit() {
    this.projetId = this.route.snapshot.params['id'];

    // Initialiser le formulaire avec des champs vides
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      competences: [[]]
    });

    // Charger les détails du projet existant à partir du service projet
    this.projetService.getProjetById(this.projetId).subscribe((projet: any) => {
      // Pré-remplir le formulaire avec les détails du projet existant
      this.projetForm.patchValue({
        nom: projet.nom,
        description: projet.description,
        competences: projet.competences
      });
    });

    this.competenceService.getAllCompetences().subscribe((data: any[]) => {
      this.competences = data;
    });
  }

  updateProjet() {
    if (this.projetForm.invalid) {
      return;
    }

    const formData = this.projetForm.value;
    console.log(formData.competences);
    const projet = {
      nom: formData.nom,
      description: formData.description,
      competences: formData.competences
    };

    this.projetService.updateProjet(this.projetId, projet).subscribe(
      () => {
        Swal.fire('Modifié', 'Le projet a été modifié avec succès', 'success');
        this.router.navigate(['/view/projet']);
      },
      (error) => {
        console.error(error);
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la modification du projet', 'error');
      }
    );
  }
}
