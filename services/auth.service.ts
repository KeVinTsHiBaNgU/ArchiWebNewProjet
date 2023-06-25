import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, private router: Router) {}
  
  async login(email: string, password: string) {
    try {
      // Appeler l'API pour se connecter
      const response = await axios.post(`${this.apiURL}auth/login`, { email, password });
  
      // Récupérer le token d'authentification de la réponse
      let reponse={
        "token":response.data.token,
        "url":response.data.redirectUrl
      }
      
      
      localStorage.setItem('token', reponse.token);
  
      // Retourner le token
      return reponse;
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
      
    } else {
      
    }
  }

  logout() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Déconnexion',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']); 
      }
    });
  }
  
  
}
