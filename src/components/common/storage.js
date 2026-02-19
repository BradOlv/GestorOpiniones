/* Utilidades de almacenamiento */

// Guardar datos en localStorage
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Obtener datos de localStorage
function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Eliminar datos de localStorage
function removeFromStorage(key) {
    localStorage.removeItem(key);
}

export { saveToStorage, getFromStorage, removeFromStorage };
