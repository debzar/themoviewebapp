import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  newMovies: any[] = [];
  loading: boolean;

  constructor(private movie: MovieService) {

    this.loading = true;

    this.movie.getDiscoverMovies()
      .subscribe((data: any) => {

        console.log(data);
        this.newMovies = data;
        this.loading = false;
      });

  }
}
