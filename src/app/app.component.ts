import { Component } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Movie Web App';

  constructor(public _ms: MovieService) {
    this._ms.getDiscoverMovies().subscribe(data => console.log(data));
  }
}
