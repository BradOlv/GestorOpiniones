# 📋 GestorOpiniones - Frontend + Backend

## 🎯 Resumen

Proyecto completo con Backend (Express + MongoDB) y Frontend Visual (Vanilla JS).

**Backend:** Gestión de usuarios, opiniones y comentarios  
**Frontend:** Interfaz moderna y responsiva

---

## 🚀 Ejecución

### Terminal 1 - Backend
```bash
npm start
```
Espera: `Servidor de Opiniones corriendo en el puerto 3001`

### Terminal 2 - Frontend (Nueva ventana)
```bash
npm run frontend
```
Espera: `Servidor Frontend corriendo en http://localhost:3000`

### Navegador
```
http://localhost:3000
```

---

## ✨ Funcionalidades

✅ **Autenticación:** Registro e inicio de sesión  
✅ **Opiniones:** Crear, ver, editar, eliminar  
✅ **Comentarios:** Agregar y eliminar comentarios  
✅ **Perfil:** Ver datos y estadísticas del usuario  
✅ **Diseño:** Interfaz moderna, responsive, animaciones  

---

## 📁 Estructura

```
GestorOpiniones/
├── Backend (No modificado)
│   ├── configs/
│   ├── src/
│   │   ├── User/
│   │   ├── Post/
│   │   ├── Comment/
│   │   └── middlewares/
│   └── index.js
│
├── Frontend (Nuevo)
│   ├── index.html + index.css + login.js  (Login)
│   ├── src/
│   │   ├── app.html + app.css + app.js    (App principal)
│   │   ├── components/
│   │   │   ├── common/   (Componentes reutilizables)
│   │   │   └── sections/ (Secciones: feed, crear-post, perfil)
│   │   └── assets/icons/ (4 iconos SVG)
│   │
│   └── server-frontend.js (Servidor)
│
└── package.json (Scripts actualizados)
```

---

## 💡 Comandos Útiles

| Comando | Propósito |
|---------|-----------|
| `npm start` | Backend producción |
| `npm run dev` | Backend desarrollo (nodemon) |
| `npm run frontend` | Frontend producción |
| `npm run dev:frontend` | Frontend desarrollo (nodemon) |

---

## 🌐 Puertos

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001 (para Postman)

---

## 📊 Creado

- ✨ 25+ archivos nuevos del frontend
- 💻 ~1500 líneas de código
- 🎨 6 componentes principales
- 📱 100% responsive
- ⚡ Cero dependencias externas (vanilla JS)

---

## 🔐 Seguridad

✅ Validaciones en cliente y servidor  
✅ Contraseñas encriptadas (backend)  
✅ CORS habilitado  
✅ Manejo seguro de sesión  

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| Backend error | Verifica que `npm start` esté ejecutándose |
| Frontend no carga | Verifica que `npm run frontend` esté corriendo |
| Datos no aparecen | Asegúrate MongoDB está configurado en `.env` |
| Port en uso | Cambia puerto en `server-frontend.js` |

---

## ✅ Verificación

- Backend: `curl http://localhost:3001/gestorOpiniones/v1/posts/all`
- Frontend: Abre `http://localhost:3000` en navegador

---

**Versión:** 1.0.0  
**Status:** ✅ Completo y Funcional  
**Fecha:** Febrero 2026
