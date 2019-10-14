import {Component, Input, OnInit} from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: any[] = [];
  genres: any[] = [];
  @Input() items: any[] = [];
  loading: boolean;
  movieselect = '';

  constructor(private movie: MovieService) {}

  ngOnInit(): void {
    this.getDiscoverMovies();
    this.getGenres();
  }


  getDiscoverMovies(): void {
    this.movie.getDiscoverMovies().subscribe((data: any) => {
      this.movies = data;
      this.loading = false;
    });
  }

  getGenres(): void {
    this.loading = true;
    this.movie.getGenre().subscribe((data: any) => {
      // console.log(data);
      this.genres = data;
      this.loading = false;
    });
  }

  selectChangeHandler(event: any) {
    // update the ui
    this.movieselect = event.target.value;
    // llamar al servicio y actualizar modelo
    console.log('categoria: ' + this.movieselect);
    this.getMovieGenre(this.movieselect.toString());
  }
  getMovieGenre(term: string) {
    if (term) {
      this.loading = true;
      this.movie.getMoviesByGenre(term).subscribe(data => {
        this.movies = data;
        this.loading = false;
      });
    } else {
      this.movie.getMovieSearch(term).subscribe((data: any) => {
        this.movies = data;
        this.loading = false;
      });
    }
  }

  search(term: string) {
    this.loading = true;
    if (term) {
      this.movie.getMovieSearch(term).subscribe((data: any) => {
        this.movies = data;
        this.loading = false;
      });
    } else {
      this.movie.getDiscoverMovies().subscribe((data: any) => {
          this.movies = data;
          this.loading = false;
        });
    }
  }

  getMovieVotes() {
    this.loading = true;
    this.movie.getMoviesByVotes(term, term2).subscribe(data => {
        this.movies = data;
        this.loading = false;
    });
  }

}
