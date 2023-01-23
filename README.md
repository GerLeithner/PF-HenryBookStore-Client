![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Final Project - Book Explorer

<img height="150" src="./bookstore.jpg" />

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize, ademas de tecnologías como bootstrap, postgres y express. 
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Implementar diversas features externas a la carrera.
- Aprender a realizar e implementar pasarelas de pago, sistemas de autentificación, notificaciones via mail y deploy. 

## Horarios y Fechas

El proyecto se llevó a cabo en el lapso de tres semanas, teniendo tutorias diarias y una DEMO semanal con el Product Owner.



## Descripcion del proyecto
Book Explorer es una Single Page Aplication en la cual los usuarios pueden acceder a la información de un amplio catálogo de libros, así como leer reseñas de estos,  al realizar una subscripcion que puede ser mensual, semestral o anual mediante el uso de PayPal, los usuarios subscriptos pueden acceder a la lectura de todos los libros que desee, y tendrá  acceso a su lista de favoritos, historial de libros leídos, además de poder continuar leyendo aquellos libros aún no finalizado, realizar reseñas de cualquier libro así como revisar y  editar toda la información de su perfil y utilizar los filtros de búsqueda, ordenamiento y barra de búsqueda para encontrar fácilmente los títulos deseados. Por último, los administradores de la página tienen acceso al dashbord de administración donde pueden editar la información tanto de libros como se usuarios y reviews, siendo capaz de desactivar libros, usuarios y reviews en caso de ser necesario




### Features Implementadas

A continuación se detallaran las diversas features que han sido implementadas a criterio de los programadores para mejorar la funcionalidad y estética del proyecto:
-Barra de Navegacion
-Barra de Búsqueda predictiva
-Filtros Combinados
-Rutas protegidas con Auth0 para evitar el acceso de usuarios no autenticados
-Carruseles interactivos
-Sistema de autentificación utilizando Auth0 que permite registrarse y logearse a través de Gmail
-Pasarela de Pagos con sistema de subscripcion renovable utilizando Paypal
-Sistema de notificaciones por mail a traves de NodeMailer
-Deploy de Base de Datos y Back en la plataforma Railway
-Deploy de Front en la plataforma Vercel



## Frontend

Se desarrolló una aplicación de React/Redux que contiene las siguientes pantallas/rutas.

__Pagina inicial__: Es una landing page con un pequeño saludo y mensaje hacia el usuario con el fin de invitarlo a registrarse en la pagina, seguido de los botones para realizar esta acción, y luego de hacer esta autentificación se habilita el botón de acceso al home.



__Ruta principal__: la página Home muestra diversos carruseles, el principal muestra una serie de libros recomendados, luego existe un carrusel con renderizado condicional que muestra aquellos libros que han sido comenzados a leer para que el usuario pueda retomar la lectura, los siguientes muestran los libros mas nuevos y aquellos con mejor puntuacion de los usuarios. Con excepcion del carrusel de recomendados, todos los carruseles al pasar el cursor activan un renderizado condicional que despliega las opciones para marcar como favorito y como leído.

__Ruta Catalogue__: en esta pantalla se renderizan todos los libros del catálogo de la página, y posee una serie de features que ayudan a facilitar que el usuario encuentre los libros que desea 

- [ ] Input de búsqueda predictiva para buscar libros por el nombre, esta barra las opciones y al apretar el nombre del libro abre el modal de detalle de dicho libro, de otra forma, al apretar el boton de busqueda filtra aquellos libros que contienen el input escrito por el usuario.
- [ ] Área donde se verá el listado de completo de libros. Al iniciar carga los primeros resultados obtenidos desde la ruta `GET /books` muestra la imágen del libro y al colocar el mouse en dicha imagen se abre un menú que permite marcar el libro como favorito y como leído.
- [ ] Botones/Opciones para filtrar los libros por género, y segun su estado(opcion valida para administradores) 
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los libros por orden alfabético y por año de publicación.
- [ ] Paginado para ir buscando y mostrando los siguientes libros.



__Ruta de detalle de Libro__: es una pantalla modal que muestra:

- [ ] La imagen de cada libro
- [ ] Título y subtitulo del libro
- [ ] Nombre del autor
- [ ] Año de publicación
- [ ] Género del libro
- [ ] Puntuacion dada por los usuarios
- [ ] Descripcion del libro
- [ ] Reseñas del libro
- [ ] Botón que activa el rederizado condicional de un form que permite al usuario realizar su propia reseña y puntuacion de cualquier libro
- [ ] Botón que al pasar el puntero despliega el menu que permite marcar los libros como favoritos o como leidos.
- [ ] Botón para cerrar la visualizacion del modal.


__Ruta Dashbord de Libros__: Esta ruta permite a los administradores controlar las caracteristicas de los libros:
- [ ] Área que muestra un listado de todos los libros del catalogo con sus características mas importantes, titulo, autor, año de publicacion, editorial, género, identificador y status
- [ ] Contiene los mismos filtrados y ordenamientos de la ruta de catalogo
- [ ] Contiene una barra de Búsqueda predictiva que permite encontrar un libro por su nombre
- [ ] Al hacer click en un libro se abre un modal que muestra la pantalla de creación, en la cual se pueden modificar todos los datos de dicho libro
- [ ] Botón que abre el modal de la pantalla de creación que permite crear un nuevo libro
- [ ] Botón para recargar los libros
- [ ] Paginado para ir buscando y mostrando los siguientes libros

__Ruta de creación__: Esta ruta contiene:

- [ ] Un formulario __controlado con JavaScript__ con todos los campos mencionados en la ruta del detalle
- [ ] Botón para resetear los campos
- [ ] Botón/Opción para crear un nuevo Libro
- [ ] Botón para cerrar el form
- [ ] En el caso de entrar a un libro existente, este formulario mostrará los datos actuales y permitirá modificarlos

__Ruta Dashbord de Usuarios__: En esta ruta los administradores pueden manejar los usuarios registrados en la pagina:
- [ ] Área que muestra un listado de todos los usuarios registrados en la pagina con sus características mas importantes, nombre de usuario, email, tipo de subscripcion, metodo de pago, fecha de activacion, fecha de expiración y estado.
- [ ] Botones/Opciones para filtrar los usuarios por tipo de subscripcion y por método de pago y segun su estado.
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los usuarios por orden alfabético.
- [ ] Al hacer click en un usuario se abre un modal que muestra la pantalla de edicion, en la cual se puede deshabilitar a un usuario en caso de baneo.
- [ ] Botón para recargar los usuarios.
- [ ] Paginado para ir buscando y mostrando los siguientes usuarios.

__Ruta de perfil de usuario__: En esta ruta se acceden a los datos personales de casa usuario:
- [ ] Form donde se muestran los principales datos del usuario dividido en secciones
- [ ] En la seccion de informacion del usuario se encuentran los datos personales, nombre de usuario, email, contraseña y foto de perfil, pudiendose cambiar con los Botones ubicados en el margen derecho
- [ ] La sección de Subscripcion muestra la informacion relacionada a esta, tipo de subscripcion, fecha de activación y expiración, método de pago, ademas de ofrecer una invitacion a subcribirse, eligiendo el tipo de plan, con lo cual se habilita el renderizado condicional del botón de acceso a Paypal
- [ ] Botón de Paypal con renderizado condicional
- [ ] La ultima sección permite al usuario elegir si desea o no recibir los avisos y notificaciones por mail a traves de nodemailer

__Ruta de About Us__: esta ruta sirve para que los usuarios puedan conocer quienes fueron los desarrolladores de la página:
- [ ] Contiene Foto, nombre y descripcion de cada uno de los desarroladores, asi como un link a sus cuentas tanto de linkedin como de GitHub

## Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [ ] Libro con las siguientes propiedades:
  - ID 
  - Título
  - Subtítulo
  - Fecha de publicación
  - Editorial
  - Descripción
  - Número de páginas
  - Puntuación Promedio
  - Puntuación del Usuario
  - Imagen de portada
  - Identificador
  - Estado

- [ ] Autor con las siguientes propiedades:
  - ID
  - Nombre

- [ ] Género con las siguientes propiedades:
  - ID
  - Nombre

- [ ] Reviews con las siguientes propiedades:
  - ID
  - Comentario
  - Puntuación
  - Fecha de creación
  - Fecha de edición

- [ ] Usuarios con las siguientes propiedades:
  - ID
  - Nombre de usuario
  - Email
  - Foto de perfil
  - Fecha de edición
  - Estado
  - Rol
  

Existen varias relaciones, entre libro, género y autor, entre usuario y libro (favoritos, leidos, leyendo ) y entre usuario, libro y reviews

## Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:



- [ ] __GET /books__:
  - Obtiene un listado de libros desde la API de google books.
- [ ] __GET /books/{idBook}__:
  - Obtiene todos los datos necesarios para el modal de detalle de dicho libro
- [ ] __GET /books?name="..."__:
  - Obtener el libro o libros que coincidan con el nombre pasado como query parameter 
  - Si no existe ningún libro muestra un aviso adecuado
- [ ] __POST /books__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de libro por body
  - Crea un libro en la base de datos relacionado con sus tipos.
- [ ] __GET /genres__:
  - Obtiene todos los géneros de libros disponibles
- [ ] __GET /authors__:
  - Obtiene todos los autores disponibles


