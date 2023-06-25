import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { ProjetService } from '../../../services/projet.service';
import { CompetenceService } from '../../../services/competence.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.css']
})
export class CreateProjetComponent implements OnInit{
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

    this.projetService.createProjet( projet).subscribe(
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
