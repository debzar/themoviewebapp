import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  movies: any[] = [];
  loading: boolean;

  constructor(private movie: MovieService) { }

  search(term: string) {
    console.log(term);
    this.loading = true;
    this.movie.getMovieSearch(term).subscribe((data: any) => {
      console.log(data);
      this.movies = data;
      this.loading = false;
    });
  }
}
