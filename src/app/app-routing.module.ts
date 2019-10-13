import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componenents
import { SearchComponent } from './components/search/search.component';
import { MovieComponent } from './components/movie/movie.component';


export const ROUTES: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  { path: '**', pathMatch: 'full', redirectTo: 'search' }
];
