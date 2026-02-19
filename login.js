/* Login Component */

function login() {
    let section = document.createElement("section");
    section.id = "login";

    let h2 = document.createElement("h2");
    h2.textContent = "GestorOpiniones";

    let p = document.createElement("p");
    p.textContent = "Comparte tus opiniones con la comunidad";

    let inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    let credential = document.createElement("input");
    credential.placeholder = "Email o Usuario";
    credential.type = "text";

    let password = document.createElement("input");
    password.placeholder = "Contraseña";
    password.type = "password";

    inputGroup.append(credential, password);

    let button = document.createElement("button");
    button.textContent = "Iniciar Sesión";

    button.addEventListener("click", async (e) => {
        e.preventDefault();
        
        if (!credential.value || !password.value) {
            showError("Por favor completa todos los campos");
            return;
        }

        button.disabled = true;
        section.classList.add("loading");

        try {
            const response = await fetch("http://localhost:3001/gestorOpiniones/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    credential: credential.value,
                    password: password.value
                })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setTimeout(() => {
                    window.location.href = "src/app.html";
                }, 500);
            } else {
                showError(data.message || "Credenciales incorrectas");
            }
        } catch (error) {
            showError("Error en la conexión. Verifica que el servidor esté corriendo en puerto 3001");
        } finally {
            button.disabled = false;
            section.classList.remove("loading");
        }
    });

    let registerLink = document.createElement("div");
    registerLink.className = "register-link";
    registerLink.innerHTML = `¿No tienes cuenta? <a href="#" id="register-btn">Regístrate aquí</a>`;

    registerLink.querySelector("#register-btn").addEventListener("click", (e) => {
        e.preventDefault();
        showRegister();
    });

    section.append(h2, p, inputGroup, button, registerLink);
    return section;
}

function showRegister() {
    const root = document.getElementById("root");
    let section = document.createElement("section");
    section.id = "login";

    let h2 = document.createElement("h2");
    h2.textContent = "Crear Cuenta";

    let p = document.createElement("p");
    p.textContent = "¡Únete a nuestra comunidad!";

    let inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    let nombre = document.createElement("input");
    nombre.placeholder = "Nombre completo";

    let username = document.createElement("input");
    username.placeholder = "Usuario";

    let email = document.createElement("input");
    email.placeholder = "Email";
    email.type = "email";

    let passwordReg = document.createElement("input");
    passwordReg.placeholder = "Contraseña";
    passwordReg.type = "password";

    inputGroup.append(nombre, username, email, passwordReg);

    let button = document.createElement("button");
    button.textContent = "Crear Cuenta";

    button.addEventListener("click", async (e) => {
        e.preventDefault();

        if (!nombre.value || !username.value || !email.value || !passwordReg.value) {
            showError("Por favor completa todos los campos");
            return;
        }

        button.disabled = true;
        section.classList.add("loading");

        try {
            const response = await fetch("http://localhost:3001/gestorOpiniones/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre.value,
                    username: username.value,
                    email: email.value,
                    password: passwordReg.value
                })
            });

            const data = await response.json();

            if (data.success) {
                showError("¡Cuenta creada exitosamente! Vuelve a la pantalla de login", "success");
                setTimeout(() => {
                    root.innerHTML = "";
                    root.appendChild(login());
                }, 1500);
            } else {
                showError(data.message || data.error?.message || "Error al crear cuenta");
            }
        } catch (error) {
            console.error("Error al registrar:", error);
            showError("❌ Error de conexión. Verifica que el backend esté corriendo en puerto 3001");
        } finally {
            button.disabled = false;
            section.classList.remove("loading");
        }
    });

    let backLink = document.createElement("div");
    backLink.className = "register-link";
    backLink.innerHTML = `¿Ya tienes cuenta? <a href="#" id="back-btn">Volver a Login</a>`;

    backLink.querySelector("#back-btn").addEventListener("click", (e) => {
        e.preventDefault();
        root.innerHTML = "";
        root.appendChild(login());
    });

    section.append(h2, p, inputGroup, button, backLink);
    root.innerHTML = "";
    root.appendChild(section);
}

function showError(message, type = "error") {
    const section = document.querySelector("#login");
    const existingError = section.querySelector(".error-message");
    
    if (existingError) {
        existingError.remove();
    }

    let errorDiv = document.createElement("div");
    errorDiv.className = `error-message ${type}`;
    errorDiv.textContent = message;

    if (type === "success") {
        errorDiv.style.background = "rgba(34, 197, 94, 0.9)";
        errorDiv.style.borderLeftColor = "#15803d";
    }

    section.insertBefore(errorDiv, section.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 4000);
}

// Inicializar
const root = document.getElementById("root");
root.appendChild(login());
