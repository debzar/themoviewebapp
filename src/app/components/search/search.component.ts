import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import {DOCUMENT} from '@angular/common';

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
  @ViewChild('minVote', {static: false}) minVote: ElementRef;
  @ViewChild('maxVote', {static: false}) maxVote: ElementRef;



  constructor(private movie: MovieService,  @Inject(DOCUMENT) document) {}

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
    let minVote = this.minVote.nativeElement.value;
    let maxVote = this.maxVote.nativeElement.value; 

    if (maxVote == '') {
        maxVote = '10'
    }

    if (minVote == '') {
        minVote = '0'
    }

    console.log('min:' + minVote + '-----' + 'max: ' + maxVote);

    this.movie.getMoviesByVotes(minVote, maxVote).subscribe(data => {
        this.movies = data;
        this.loading = false;
    });
  }

}
