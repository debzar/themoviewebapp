import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import {DOCUMENT} from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {concat} from 'rxjs';

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

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private movie: MovieService,  @Inject(DOCUMENT) document) {}

  ngOnInit(): void {
    this.getDiscoverMovies();
    this.getGenres(); // call service here

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false,
      class: `genre-dropdown`
    };
  }

  getDiscoverMovies(): void {
    this.movie.getDiscoverMovies().subscribe((data: any) => {
      this.movies = data;
      this.loading = false;
    });
  }

  getGenres(): void {
    const tmp = [];
    this.loading = true;
    this.movie.getGenre().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        tmp.push({ item_id: data[i].id, item_text: data[i].name });
      }
      this.dropdownList = tmp;

    });
  }

  getMovieGenre(term: string) {
    if (term) {
      console.log(term);
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

  onItemSelect(item: any) {
    this.selectedItems.push(item.item_id);
    const items = this.selectedItems.toString();
    this.getMovieGenre(items);
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
        maxVote = '10';
    }

    if (minVote == '') {
        minVote = '0';
    }


    this.movie.getMoviesByVotes(minVote, maxVote).subscribe(data => {
        this.movies = data;
        this.loading = false;
    });
  }

}
