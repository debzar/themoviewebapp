import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: any[] = [];
  loading: boolean;

  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.movie.getDiscoverMovies().subscribe((data: any) => {
      console.log('Sin texto 1');
      this.movies = data;
      this.loading = false;
    });
  }

  search(term: string) {
    console.log(term);
    this.loading = true;

    if (term) {
      this.movie.getMovieSearch(term).subscribe((data: any) => {
        console.log('Con texto');
        this.movies = data;
        this.loading = false;
      });
    } else {
      this.movie.getDiscoverMovies().subscribe((data: any) => {
          console.log('Sin texto 2');
          this.movies = data;
          this.loading = false;
        });
    }


  }

}
