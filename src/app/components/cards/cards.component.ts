import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() items: any[] = [];

  // @ts-ignore
  constructor(private router: Router) {}

  watchMovie(item: any) {
    let movieId;

    movieId = item.id;
    this.router.navigate(['/movie', movieId]);
  }
}
