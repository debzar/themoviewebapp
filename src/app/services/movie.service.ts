import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Importo map reactive extentions
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apikey = 'f9b276a8a665a41333c2def2f632a2e4';
  private urlMovie = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const url = `https://api.themoviedb.org/3${query}&api_key=${
      this.apikey
    }&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '');
  }

  getQueryforMovie(query: string) {
    const url = `https://api.themoviedb.org/3${query}?api_key=${
      this.apikey
    }&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '');
  }

  getDiscoverMovies() {
    return this.getQuery('/discover/movie?sort_by=popularity.desc').pipe(
      map((data: any) => data.results)
    );
  }

  getMovieSearch(term: string) {
    return this.getQuery(
      `/search/movie?query=${term}&sort_by=popularity.desc`
    ).pipe(map((data: any) => data.results));
  }

  getMovie(id: string) {
    return this.getQueryforMovie(`/movie/${id}`).pipe(
      map((data: any) => data)
    );
  }

  getGenre() {
    return this.getQueryforMovie('/genre/movie/list').pipe(
      map((data: any) => data.genres)
    );
  }

  getMoviesByGenre(term: string) {
    return this.getQuery(`/discover/movie?with_genres=${term}&sort_by=popularity.desc`)
      .pipe(map((data: any) => data.results));
  }

  getMoviesByVotes(term: string, term2: string) {
    return this.getQuery(`/discover/movie?vote_average.gte=${term}&vote_average.lte=${term2}&sort_by=vote_average.desc`)
      .pipe(map((data: any) => data.results));
  }

}
