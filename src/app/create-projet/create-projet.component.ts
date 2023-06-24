

import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjetService } from '../../../services/projet.service';
import { ModalService } from '../../../services/modal.service';
import { CompetenceService } from '../../../services/competence.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-projet',
  templateUrl: './create-projet.component.html',
  styleUrls: ['./create-projet.component.css']
})
export class CreateProjetComponent implements OnInit {
  projetForm: FormGroup= new FormGroup({});
  competences: any[] = []; // Remplacer 'any' par le type approprié pour les compétences
  id: any;
  modalNouveauProjet: any;

  constructor( private formBuilder: FormBuilder, private projetService: ProjetService ,  private competenceService: CompetenceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      competences: [[]]
    });

    // Charger les compétences depuis le service compétence
    this.competenceService.getAllCompetences().subscribe((data: any[]) => {
      this.competences = data;
    });
  }

  onSubmit() {
    if (this.projetForm.invalid) {
      return;
    }
  
    const formData = this.projetForm.value;
    const projet = {
      nom: formData.nom,
      description: formData.description,
      competences: formData.competences,
      enseignant: this.id
    };
  
    this.projetService.createProjet(projet).subscribe((data) => {
      // Traiter la réponse du serveur ou effectuer une action appropriée
    });

    // this.projetService.updateProjet(projet.id, projet).subscribe(
    //   (data: any) => {
    //     // Traiter la réponse du serveur ou effectuer une action appropriée
    //     // par exemple, afficher un message de succès ou rediriger vers une autre page
    //   },
    //   (error: any) => {
    //     console.error(error);
    //     // Gérer l'erreur lors de la modification du projet
    //   }
    // );
  }    

  // loadProjet(projetId: string) {
  //   this.projetService.getProjetById(projetId).subscribe(
  //     (projet: any) => {
  //       // Remplir les champs du formulaire avec les données du projet
  //       this.projetForm.patchValue({
  //         nom: projet.nom,
  //         description: projet.description,
  //         competences: projet.competences
  //       });
  //     },
  //     (error: any) => {
  //       console.error(error);
  //       // Gérer l'erreur lors du chargement du projet
  //     }
  //   );
  // }
      
}
    