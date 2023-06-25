import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultatService } from '../../../services/resultat.service';

@Component({
  selector: 'app-resultat-edit',
  templateUrl: './resultat-edit.component.html',
  styleUrls: ['./resultat-edit.component.css']
})
export class ResultatEditComponent implements OnInit {
  resultat: any;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultatService: ResultatService
  ) { }

  ngOnInit(): void {
    const resultatId = this.route.snapshot.paramMap.get('id');
    if (resultatId) {
      this.getResultat(resultatId);
    }
  }

  getResultat(id: string): void {
    this.resultatService.getResultat(id).subscribe(
      (resultat: any) => {
        this.resultat = resultat;
      },
      (error: any) => {
        console.error(error);
        // Gérer l'erreur lors de la récupération du résultat
      }
    );
  }

  updateResultat(): void {
    this.loading = true;
    
    this.resultatService.updateResultat(this.resultat).subscribe(
      () => {
        this.loading = false;
        // Rediriger vers la page de détails du résultat
        this.router.navigate(['/student/dashboard']);
      },
      (error: any) => {
        this.loading = false;
        console.error(error);
        // Gérer l'erreur lors de la mise à jour du résultat
      }
    );
  }
  constrainNoteValue() {
    if (this.resultat.note < 0) {
      this.resultat.note = 0;
    } else if (this.resultat.note > 100) {
      this.resultat.note = 100;
    }
  }
  
}
