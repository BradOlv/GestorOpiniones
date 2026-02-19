# 📋 GestorOpiniones - Frontend + Backend

## 🎯 Descripción

Se ha agregado un frontend visual para GestorOpiniones (Vanilla JS) que permite a los usuarios compartir opiniones, comentar y gestionar un perfil. **El backend no fue modificado**, por lo que todas las pruebas de Postman funcionan igual.

Para editar o eliminar opiniones y comentarios, primero debes obtenerlas mediante GET para acceder a sus IDs.

---

## 🚀 Instalación y Ejecución

### Terminal 1 - Backend
```bash
npm start
```
✅ Espera: `Servidor de Opiniones corriendo en el puerto 3001`

### Terminal 2 - Frontend (Nueva ventana)
```bash
npm run frontend
```
✅ Espera: `Servidor Frontend corriendo en http://localhost:3000`

### Navegador
```
http://localhost:3000
```

---

## ✨ Características

- **Autenticación:** Registro e inicio de sesión con localStorage
- **Opiniones:** Crear, visualizar, editar y eliminar opiniones
- **Comentarios:** Agregar comentarios a opiniones y eliminarlos
- **Perfil:** Ver información del usuario autenticado
- **Diseño:** Interfaz moderna, responsive y animaciones suaves
- **SPA:** Navegación sin recargas usando componentes modulares

---

## 📁 Estructura del Proyecto

```
GestorOpiniones/
├── Backend (No modificado)
│   ├── configs/          → Configuraciones de app, DB, CORS
│   ├── src/
│   │   ├── User/         → Modelo, controlador, rutas
│   │   ├── Post/         → Opiniones
│   │   ├── Comment/      → Comentarios
│   │   └── middlewares/  → Validaciones
│   └── index.js          → Entry point
│
├── Frontend (Nuevo)
│   ├── index.html + index.css + login.js       → Módulo login
│   │
│   ├── src/
│   │   ├── app.html + app.css + app.js         → Aplicación principal
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── button/        → Botón navegación
│   │   │   │   ├── postCard/      → Tarjeta opinión
│   │   │   │   ├── commentCard/   → Tarjeta comentario
│   │   │   │   └── storage.js     → Helper localStorage
│   │   │   │
│   │   │   └── sections/
│   │   │       ├── feed/          → Feed de opiniones
│   │   │       ├── crear-post/    → Formulario crear opinión
│   │   │       └── mi-perfil/     → Perfil de usuario
│   │   │
│   │   └── assets/icons/          → Iconos SVG (4 archivos)
│   │
│   └── server-frontend.js         → Servidor Express (puerto 3000)
│
├── README_GESTOR.md
├── package.json
└── .env                           → Variables de entorno
```

---

## 🔌 Endpoints API (Sin cambios)

### Usuarios
- `POST /users/register` - Registrar usuario
- `POST /users/login` - Iniciar sesión
- `PUT /users/update` - Actualizar perfil

### Opiniones
- `POST /posts/save` - Crear opinión
- `GET /posts/all` - Obtener todas las opiniones
- `GET /posts/id/{postId}` - Obtener opinión por ID
- `PUT /posts/update/{postId}` - Editar opinión
- `DELETE /posts/delete/{postId}` - Eliminar opinión

### Comentarios
- `POST /comments/add` - Agregar comentario
- `GET /comments/post/{postId}` - Obtener comentarios de una opinión
- `PUT /comments/update/{commentId}` - Editar comentario
- `DELETE /comments/delete/{commentId}` - Eliminar comentario

---

## 💡 Notas Importantes

- Las opiniones y comentarios se guardan en MongoDB
- La sesión de usuario se mantiene en `localStorage` del navegador
- Para editar/eliminar, primero obtén el recurso con GET para acceder a su ID
- El backend valida todas las operaciones
- CORS está habilitado entre puerto 3000 (frontend) y 3001 (backend)

---

## 🆘 Solución de Problemas

| Problema | Solución |
|----------|----------|
| Puerto 3001 en uso | Cierra otra instancia o cambia en `.env` |
| MongoDB no conecta | Verifica conexión en `.env` y que MongoDB esté corriendo |
| CORS error | Asegura que ambos servidores estén ejecutándose |
| No puedo editar | Verifica que seas el autor de la opinión/comentario |
| Datos no aparecen | Intenta recargar la página (F5) |

---

**Versión:** 1.0.0  
**Status:** ✅ Funcional y Listo  
**Creado:** Febrero 2026
