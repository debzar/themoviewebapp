import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  movie: any = {};
  loadingMovie: boolean;

  constructor(private router: ActivatedRoute, private happymovie: MovieService) {

    this.loadingMovie = true;

    this.router.params.subscribe(params => {
      console.log(params);

      this.happymovie.getMovie(params['id'])
        .subscribe(movie => {
          console.log(movie);
          this.movie = movie;
          this.loadingMovie = false;
        })
    })
  }
}
