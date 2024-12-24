# Examen Mavi

Examen de mavi realizado con monorepo, sequelize y vue.

## Authors

- [@AdrianDiazMercado](https://www.github.com/AdrianDiazMercado)

## Documentation

### 1. Dirigirse a la carpeta raiz del archivo y instalar las dependencias: 
    ```bash
    npm install
    ```
    ```bash
    npx turbo run build
    ```
### 2. Crear archivo .env
1. Dirigete a la carpeta \apps\api\ y crea un archivo `.env` desde el documento `.env-templete` que se encuentra ahi, copia y pega el contenido en `.env`

### 3. Crear entorno de DB
1. Con el archivo `.env` creado, dirigete a tu herramienta de administración de bases de datos para crear una conexion postgres.

2. Colocar los datos correspondientes desde `.env` en tu herramienta de administración de bases de datos.

### 4 Iniciar el proyecto
Ejecuta el siguiente comando desde la carpeta raiz:
```bach
npm run dev
 ```