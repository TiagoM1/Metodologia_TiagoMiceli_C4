# TP - JSON Server y React Router

Este proyecto utiliza React + TypeScript + React Router DOM + JSON Server para mostrar cursos y sus estudiantes.

# Pasos para ejecutar

# 1. Instalar dependencias

Desde la carpeta principal del proyecto:

cd cursos-app
npm install

# 2. Iniciar el servidor JSON Server

Este comando levanta la db.json con los cursos y estudiantes cargados:

npm run server

Se levanta en `http://localhost:3000`

# 3. Iniciar la app de React

En otra terminal, también dentro de `cursos-app`:

npm run dev

Esto abre la app en `http://localhost:5173`

# Funcionalidades

- Muestra lista de cursos (`/cursos`)
- Redirige a estudiantes filtrados por ID del curso enviado como param(`/estudiantes?curso=ID`)