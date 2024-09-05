
## Documentation


## Configuración Paso a Paso

### Paso 1: Instalar Turborepo

1. **Inicializa un proyecto nuevo**:
    ```bash
    mkdir my-monorepo
    cd my-monorepo
    npm init -y
    ```

    Este comando crea un nuevo directorio `my-monorepo`, lo establece como tu directorio de trabajo actual y genera un archivo `package.json` básico.

2. **Instala Turborepo como dependencia de desarrollo**:
    ```bash
    npm install turbo --save-dev
    ```

    Esto instala Turborepo como una dependencia de desarrollo, lo que te permitirá ejecutar comandos de Turborepo en tu monorepo.

3. **Crea un archivo de configuración para Turborepo (`turbo.json`)**:
    Crea un archivo llamado `turbo.json` en la raíz del proyecto con el siguiente contenido:

    ```json
    {
       "$schema": "https://turbo.build/schema.json",
        "globalDependencies": [],
        "tasks": {
          "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**"]
   },   
     "dev": {
       "cache": false,
       "outputs": []
      }
     }
    }
    ```

    Este archivo define las tareas de compilación y desarrollo que Turborepo manejará.
4. **Agrega packageManager y Workspaces en archivo `package.json` en la raiz**
  ```bash
    "packageManager": "npm@0.0.0", //Remplazar por tu version de node
    "workspaces": [
      "apps/*",
      "packages/*"
  ]
  ```
### Paso 2: Crear la Estructura de Carpetas

1. **Crea la carpeta `apps` y la subcarpeta `api`**:
    ```bash
    mkdir apps
    cd /apps
    mkdir api
    ```

    Esto crea la carpeta principal `apps` y dentro de ella `api` (para la aplicación de Prisma).

### Paso 3: Configurar el Entorno de React en `client`

1. **Navega a la carpeta `apps`**:
    ```bash
    cd apps/
    ```

2. **Inicializa un nuevo proyecto de React con Vite**:
    ```bash
    npm create vite@latest
    ```
    El nonbre de proyecto sera "client", esto para separar el entorno de front-end.

    Durante la instalación, selecciona las opciones "React" y "TypeScript". Esto creará una nueva aplicación de React utilizando Vite como bundler.
    
3. **Navega a la carpeta `client`**
    ```bash
      cd /client
    ```
4. **Instala dependencias adicionales necesarias para React**:
    ```bash
    npm install
    ```

    Este comando instala todas las dependencias necesarias para la aplicación de React configurada con Vite.

5. **Configura los scripts de desarrollo en el archivo `package.json`**:
    Asegúrate de que el archivo `package.json` contenga los scripts adecuados para ejecutar y compilar la aplicación:

    ```json
       "scripts": {
       "dev": "vite",
       "build": "tsc -b && vite build",
       "lint": "eslint .",
       "preview": "vite preview",
       "start": "vite preview"
    }
    ```

### Paso 4: Configurar el Entorno de Prisma en `api`

1. **Navega a la carpeta `api`**:
    ```bash
    cd ../api
    ```

2. **Inicializa un nuevo proyecto de Node.js**:
    ```bash
    npm init -y
    ```

    Este comando crea un nuevo archivo `package.json` para la aplicación `api`.

3. **Instala Prisma y sus dependencias necesarias**:
    ```bash
    npm install prisma --save-dev
    npm install @prisma/client
    ```

    Instala Prisma como una dependencia de desarrollo y el cliente Prisma para interactuar con la base de datos.

4. **Inicializa Prisma**:
    ```bash
    npx prisma init
    ```

    Este comando genera un archivo de configuración `prisma/schema.prisma` y un archivo `.env` para la configuración de la base de datos.

5. **Instala ts-node-dev como dependencia de desarrollo**
    ```bash
    npm install ts-node-dev --save-dev
    ```
    Asegurate que ts-node-dev se encuentre en tu package.json en `api`
    ```bash
      "devDependencies": {
        "ts-node-dev": "^2.0.0" // Asegúrate de que ts-node-dev esté aquí
    }
    ```
6. **crear un archivo `tsconfig.json` en `api`**
  ```bash
    npx tsc --init
  ```
  Asegurate que tu archivo `tsconfig.json` sea de la siguiente manera
  ```bash
  {
  "compilerOptions": {
    "target": "ES2020",                      // Especifica el target de JavaScript
    "module": "NodeNext",                    // Utiliza el sistema de módulos de Node.js más reciente
    "moduleResolution": "NodeNext",          // Resuelve los módulos de acuerdo con Node.js
    "strict": true,                          // Activa todas las comprobaciones estrictas
    "esModuleInterop": true,                 // Permite la interoperabilidad entre ES Modules y CommonJS
    "skipLibCheck": true,                    // Omite la verificación de archivos de declaración
    "forceConsistentCasingInFileNames": true,// Enforce consistent casing in file names
    "outDir": "./dist"                       // Output directory for compiled files
  },
  "include": ["src/**/*"],                    // Incluye todos los archivos en el directorio src
  "exclude": ["node_modules", "**/*.spec.ts"] // Excluye node_modules y archivos de pruebas
}
```
 7. **Crear un archivo index.ts carpeta src en `api` para levantar el server** 
    
    test-monorepo/apps/api/src

    ```bash
      import express from 'express';
      const app = express();
      const port = process.env.PORT || 3000;
      app.get('/', (req, res) => {
      res.send('Hello, World!');
      });
      app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      });
    ```
  8. **Instala `express` y los tipos de TypeScript correspondientes**
  ```bash
  npm install express
  npm install --save-dev @types/express
  ```

  Verifica que `package.json` en `api` tengan las dependencias
  ```bash
    "devDependencies": {
    "ts-node-dev": "^2.0.0",
      "@types/express": "^4.17.17"
  }
  ```

9. **Configura los scripts en el archivo `package.json`**:
    Asegúrate de que el archivo `package.json` incluya los siguientes scripts para      manejar Prisma:

    ```json
    {
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
        "prisma": "prisma",
        "generate": "prisma generate",
        "migrate": "prisma migrate dev"
      },
    }
    ```

### Paso 5: Configurar el Monorepo con Turborepo

1. **Regresa a la raíz del proyecto (`my-monorepo`)**:
    ```bash
    cd ../../
    ```
2. **Agrega un archivo `.gitignore`**:
    Asegúrate de ignorar las carpetas y archivos que no deseas rastrear en git:

    ```gitignore
    node_modules
    dist
    .turbo
    .env
    ```

### Paso 6: Ejecutar el Monorepo

1. **Corre el comando de desarrollo para ambos proyectos**:
    ```bash
    npx turbo run dev --parallel
    ```

    Este comando ejecuta el entorno de desarrollo tanto para `client` como para `api` de manera paralela.

### Paso 7: Verificar la Configuración

- **Prueba los entornos de `client` y `api` para asegurarte de que funcionen correctamente**.
- Asegúrate de que la aplicación de React esté funcionando en `http://localhost:3000` (o el puerto configurado en Vite).
- Verifica que los comandos de Prisma funcionen correctamente.

## Conclusión

¡Con estos pasos, tu monorepo estará completamente configurado con Turborepo, React en `client` y Prisma en `api`!