# Comandos importantes

## Build de los contenedores
Para realizar el primer build de los contenedores es necesario correr el comando ```docker-compose up --build``` el cual hace el seteo de todo el espacio de trabajo necesario
Nota: Cuando se hace un cambio en el gemfile para incluir una gema nueva en el proyecto, es necesario correr este comando nuevamente.

## Levantar los contenedores
Cuando solamente se desea levantar los contenedores, se debe correr el comando ```docker-compose up```.

## Comandos de rails
Cuando se quiere correr algun comando de rails para crear migraciones, modelos, controladores, etc. Se debe correr lo siguiente: ```docker-compose run --rm web <comando Rails>``` donde en ```<comando Rails>```se debe agregar el comando que se quiere correr.

## Otra alternativa
Tambien se puede entrar directamente a la bash del contenedor para poder utilizar los comandos de forma directa. Para esto, primero debemos correr ```docker-compose run --rm web bash```. Esto nos llevara a la bash del contenedor, y ahi podemos usar los comandos de rails de la forma típica.

## Bajar los contenedores
Al terminar de trabajar, se puede correr el comando ```docker-compose down``` para bajar los contenedores que se estaban utilizando.