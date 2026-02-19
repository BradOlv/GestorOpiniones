/* Aplicación principal */

import { Button } from "./components/common/button/button.js";
import { feed } from "./components/sections/feed/feed.js";
import { crearPost } from "./components/sections/crear-post/crear-post.js";
import { miPerfil } from "./components/sections/mi-perfil/mi-perfil.js";

// Verificar sesión
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "../index.html";
    throw new Error("No hay sesión activa");
}

let nav = document.getElementById("nav");
let container = document.getElementById("container");

// Botón Feed
nav.appendChild(Button(
    "Feed",
    "feed",
    "feed.svg",
    function () {
        container.innerHTML = "";
        container.appendChild(feed());
    }
));

// Botón Crear Opinión
nav.appendChild(Button(
    "Crear Opinión",
    "crear",
    "plus.svg",
    function () {
        container.innerHTML = "";
        container.appendChild(crearPost());
    }
));

// Botón Mi Perfil
nav.appendChild(Button(
    "Mi Perfil",
    "perfil",
    "user.svg",
    function () {
        container.innerHTML = "";
        container.appendChild(miPerfil());
    }
));

// Botón Cerrar Sesión
nav.appendChild(Button(
    "Cerrar Sesión",
    "logout",
    "logout.svg",
    function () {
        if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
            localStorage.removeItem("user");
            window.location.href = "../index.html";
        }
    }
));

// Vista inicial: feed
container.appendChild(feed());
