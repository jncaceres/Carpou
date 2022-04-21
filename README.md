# Comandos importantes

## Build de los contenedores

Para realizar el primer build de los contenedores es necesario crear los archivos mencionados al final de este README en la sección _Variables de entorno_ y luego correr el comando `docker-compose up --build` el cual hace el seteo de todo el espacio de trabajo necesario.
Nota: Cuando se hace un cambio en el gemfile para incluir una gema nueva en el proyecto, es necesario correr este comando nuevamente.

## Levantar los contenedores

Cuando solamente se desea levantar los contenedores, se debe correr el comando `docker-compose up`.

## Comandos de rails

Cuando se quiere correr algun comando de rails para crear migraciones, modelos, controladores, etc. Se debe correr lo siguiente: `docker-compose run --rm web <comando Rails>` donde en `<comando Rails>`se debe agregar el comando que se quiere correr.

## Otra alternativa

Tambien se puede entrar directamente a la bash del contenedor para poder utilizar los comandos de forma directa. Para esto, primero debemos correr `docker-compose run --rm web bash`. Esto nos llevara a la bash del contenedor, y ahi podemos usar los comandos de rails de la forma típica.

## Bajar los contenedores

Al terminar de trabajar, se puede correr el comando `docker-compose down` para bajar los contenedores que se estaban utilizando.

# Variables de entorno

Para poder correr la aplicación y levantar de forma correcta los contenedores, es necesario crear 2 archivos, uno llamado .env.development y otro llamado .env.test con el siguiente contenido. Notar que la DB, el usuario y la contraseña puede ser cualquiera, solo es importante que se reemplacen los valores de forma correcta en la url.

.env.development:

```
POSTGRES_DB=database
POSTGRES_USER=user
POSTGRES_PASSWORD=password
DATABASE_URL=postgres://user:password@db:5432/database
```

.env.test:

```
POSTGRES_DB=database
POSTGRES_USER=user
POSTGRES_PASSWORD=password
DATABASE_URL=postgres://user:password@db-test:5432/database
```
