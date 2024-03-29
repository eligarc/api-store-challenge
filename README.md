# Api fashion store [challenge]

_Proyecto de ecommerce para vender ropa en linea_

## Comenzando 🚀


### Instalación 🔧

_Se debe de crear un archivo de variables entorno con los siguientes datos:_

_.env_

```
PORT=3000
DB_USER=''
DB_NAME='store_challenge'
DB_PASSWORD=''
DB_HOST='localhost'
DB_PORT=5432
DB_EMAIL_PG='admin@mail.com'
DB_PASS_PG='root'
DB_PORT_PG=80
DATABASE_URL=
JWT_SECRET=
EXPIRE_TIME_ACCESS_TOKEN=
```

_igual hay que instalar docker-compose para los servicios de postgres y pgadmin. Antes de correr la aplicación se deben levantar los servicios con el siguiente comando:_

```
docker-compose up -d postgres pgadmin
```

_Por último debemos dejecutar el siguiente comando para correr el proyecto:_

```
npm run dev
```

_Con esto se tendría funcionando el api y en caso se agregar nuevos campos a las tablas de bd se necesitan usar estos comandos:_

```
npm run migrations:generate name_migration
npm run migrations:run
npm run migrations:revert
```
## Despliegue 📦

_Deplegar en produción se ocupa el comenta git push heroku main_



---
⌨️ con ❤️ por [eligarc](https://github.com/eligarc) 😊