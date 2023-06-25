import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultatService {
  private apiUrl = 'http://localhost:3000/api/resultats'; // Remplacez l'URL par celle de votre API

  constructor(private http: HttpClient) {}

  // Obtenir un résultat par l'ID de l'étudiant et de la compétence
  getResultat( competenceId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${competenceId}`;
    return this.http.get(url,{headers});
  }
   // Obtenir un résultat par l'ID de l'étudiant et de la compétence
   getResultats( ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}`;
    return this.http.get(url,{headers});
  }

  // Créer un résultat
  createResultat( competenceId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/new`;
    const body = { competenceId };
    return this.http.post(url, body,{headers});
  }

  // Supprimer un résultat par l'ID de l'étudiant et de la compétence
  deleteResultat( competenceId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${competenceId}`;
    return this.http.delete(url, {headers});
  }
  updateResultat(resultat: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${resultat._id}`;
    const result={
      "resulat": resultat.resultat,
      "note": resultat.note

    }
    return this.http.put<any>(url, resultat,{headers});
  }
}
