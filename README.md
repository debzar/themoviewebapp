THE MOVIE DB WEB APP

Aplicación Web consumiento la API de TheMovieDB mediante Angular 8.
Para correr la aplicación localmente es necesario ir al archivo package.json y quitar la siguiente linea:

"postinstall": "ng build --aot --prod"

Ademas de lo anterior cambiar 

"start": "node server.js", por "start": "ng serve",

entrar a la carpeta correspondiente y ejecutar:


 - npm install
 - ng server --open
 
 En Heroku: https://themoviewebapp.herokuapp.com/
