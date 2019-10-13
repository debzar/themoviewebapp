
import { Pipe, PipeTransform } from '@angular/core';


// Pipe encargado de pasar las imagenes de las Peliculas
@Pipe({
  name: 'movieImage'
})
export class MovieImagePipe implements PipeTransform {

  transform(movie: any): any {

    // path url generica para obtener imagenes
    const url = 'http://image.tmdb.org/t/p/w400';

    if (movie.poster_path) {
      return url + movie.poster_path;
    } else {
      if (movie.backdrop_path) {
        return url + movie.backdrop_path;
      } else {
        // Si la pelicula no tiene imagenes disponibles retorna una generica
        return 'assets/img/noimage.png';
      }
    }
  }

}
