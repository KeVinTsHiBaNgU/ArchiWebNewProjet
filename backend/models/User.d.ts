// backend/models/User.d.ts

export interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    projetsInscrits?: string[];
  CompetencesAcquises?: string[];
  projetsCrees?: string[];
  }
  