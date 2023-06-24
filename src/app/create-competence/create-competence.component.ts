import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CompetenceService } from '../../../services/competence.service';


@Component({
  selector: 'app-create-competence',
  templateUrl: './create-competence.component.html',
  styleUrls: ['./create-competence.component.css']
})
export class CreateCompetenceComponent { competenceForm: FormGroup = new FormGroup({});

  competences: any[] = []; // Tableau contenant les compétences existantes en base
  nom?: string;
  description?: string;
  competencesRequises?: any[]=[[]];
  niveau?: number;
  parent?:any;

constructor(private formBuilder: FormBuilder, private competenceService: CompetenceService) { }

ngOnInit() {
  this.competenceForm = this.formBuilder.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
    competencesRequises: [[]],
    niveau: ['', Validators.required],
    parent: ['']
  });

  this.competenceService.getAllCompetences().subscribe(
    (data: any[]) => {
      this.competences = data;
    },
    error => {
      console.log(error);
    }
  );
}

onSubmit() {
  let competence ={
    "nom":this.nom,
    
    "description":this.description
 

  }
  this.competenceService.createCompetence(competence).subscribe(
    data => {
      console.log('Compétence créée avec succès');
      // Réinitialiser le formulaire
      this.competenceForm.reset();
    },
    error => {
      console.log(error);
    }
  );
}
}