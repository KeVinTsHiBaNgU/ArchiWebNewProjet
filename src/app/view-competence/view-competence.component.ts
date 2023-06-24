import { Component, OnInit } from '@angular/core';
import { CompetenceService } from '../../../services/competence.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-competence',
  templateUrl: './view-competence.component.html',
  styleUrls: ['./view-competence.component.css']
})
export class ViewCompetenceComponent implements OnInit {
  competences: any[] = [];

  constructor(private competenceService: CompetenceService, private router: Router) { }

  ngOnInit() {
    this.getAllCompetences();
  }

  getAllCompetences() {
    this.competenceService.getAllCompetences().subscribe((data: any[]) => {
      this.competences = data;
    });
  }

  onAjouterCompetence() {
    this.router.navigate(['/competence/new']);
  }
}
