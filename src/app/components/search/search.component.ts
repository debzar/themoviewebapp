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

  getMoviesGenre(term: string) {
    if (term) {
      this.loading = true;
      // const genreId = term.id;
      // const genreName = term.name;
      // console.log(genreName + ' - ' + genreId);
      this.movie.getMoviesByGenre(term).subscribe(movie => {
        this.movie = movie;
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
    // console.log('listado' + term);
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
}
