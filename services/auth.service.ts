// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api/';

//   constructor(private http: HttpClient) { }

//   login(email: string, password: string): Observable<any> {
//     const body = { email, password };
//     return this.http.post(`${this.apiUrl}auth/login`, body);
//   }
// }
import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:3000/api/'; // Mettez à jour l'URL avec votre URL de l'API

  constructor(private http: HttpClient) {}

  // login(email: string, password: string) {
  //   const body = { email, password };
  
  //   return this.http.post(`${this.apiURL}auth/login`, body, {
  //     headers: new HttpHeaders({
  //       'Authorization': 'Bearer ' + localStorage.getItem('token')
  //     })
  //   });
  // }
  
  async login(email: string, password: string) {
    try {
      // Appeler l'API pour se connecter
      const response = await axios.post(`${this.apiURL}auth/login`, { email, password });
  
      // Récupérer le token d'authentification de la réponse
      const token = response.data.token;
  
      // Sauvegarder le token dans le stockage local ou dans un service de gestion de l'état
      // par exemple, utilisez localStorage ou un autre service de gestion de l'état comme NgRx
      localStorage.setItem('token', token);
  
      // Retourner le token
      return token;
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors de la connexion');
    }
  }
  
  // ...
  
  async someOtherMethod() {
    // Récupérer le token depuis le stockage local ou une autre source
    const token = localStorage.getItem('token');
  
    // Vérifier si le token est disponible
    if (token) {
      // Utiliser le token pour ajouter l'en-tête d'autorisation dans une requête
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // Faire la requête HTTP avec les en-têtes d'autorisation
      // ...
    } else {
      // Gérer le cas où le token n'est pas disponible
      // ...
    }
  }
  
}
