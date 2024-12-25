# Examen Mavi

Examen de mavi realizado con monorepo, sequelize y vue.

## Authors

- [@AdrianDiazMercado](https://www.github.com/AdrianDiazMercado)

## Documentation

### Dependencias
Tener postgresql instalado y usuario `postgres` en tu entorno.

Tener node.js instalado en tu entorno.

### 1.Descarga del proyecto
Abrir la terminal y en el director donde mas sea de tu agrado ejecuta:

```bash
git clone https://github.com/AdrianDiazMercado/Exam.git
```
### 2. Dirigirse a la carpeta raíz del archivo e instalar las dependencias: 
```bash
npm install
```
```bash
npx turbo run build
```
### 3. Crear archivo .env
1. Dirígete a la carpeta \apps\api\ y crea un archivo `.env` desde el documento `.env-templete` que se encuentra ahí, copia y pega el contenido en `.env`

### 4. Crear entorno de DB
1. Con el archivo `.env` creado, dirígete a tu herramienta de administración de bases de datos para crear una conexión postgres.

2. Colocar los datos correspondientes desde `.env` en tu herramienta de administración de bases de datos.

### 5 seeder
Ejecuta el comando 
```bash
npm run seed
```
para cargar un cliente y poder utilizar la aplicación
```bash
email: clientMavi@gmail.com
password: clientmavipasswordsecurity
```

### 6 Iniciar el proyecto
Ejecuta el siguiente comando desde la carpeta raíz para arrancar turborepo:
```bach
npm run dev
 ```
