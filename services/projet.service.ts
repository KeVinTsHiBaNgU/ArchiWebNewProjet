import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
 
  private apiUrl = 'http://localhost:3000/api/projets';

  constructor(private http: HttpClient) { }

  createProjet(projetData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/new`, projetData);
  }

  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getProjetById(projetId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${projetId}`);
  }

  updateProjet(projetId: string, projetData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${projetId}`, projetData);
  }

  deleteProjet(projetId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${projetId}`);
  }
}
