/* Sección Crear Opinión */

function crearPost() {
    let section = document.createElement("section");
    section.id = "crear-post";

    let title = document.createElement("h1");
    title.textContent = "✍️ Compartir una Nueva Opinión";

    let form = document.createElement("form");
    form.className = "post-form";

    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Título de tu opinión";
    let titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Escribe un título atractivo...";
    titleInput.maxLength = 100;
    titleInput.required = true;

    let countTitle = document.createElement("span");
    countTitle.className = "char-count";
    countTitle.textContent = "0/100";

    titleInput.addEventListener("input", (e) => {
        countTitle.textContent = `${e.target.value.length}/100`;
    });

    let categoryLabel = document.createElement("label");
    categoryLabel.textContent = "Categoría";
    let categoryInput = document.createElement("select");
    categoryInput.required = true;
    let options = [
        { value: "", text: "Selecciona una categoría" },
        { value: "Tecnología", text: "Tecnología" },
        { value: "Política", text: "Política" },
        { value: "Deportes", text: "Deportes" },
        { value: "Entretenimiento", text: "Entretenimiento" },
        { value: "Salud", text: "Salud" },
        { value: "Educación", text: "Educación" },
        { value: "Otros", text: "Otros" }
    ];
    options.forEach(opt => {
        let option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        categoryInput.appendChild(option);
    });

    let contentLabel = document.createElement("label");
    contentLabel.textContent = "Tu opinión";
    let contentInput = document.createElement("textarea");
    contentInput.placeholder = "Comparte tu opinión, análisis o reflexión...";
    contentInput.maxLength = 2000;
    contentInput.required = true;

    let countContent = document.createElement("span");
    countContent.className = "char-count";
    countContent.textContent = "0/2000";

    contentInput.addEventListener("input", (e) => {
        countContent.textContent = `${e.target.value.length}/2000`;
    });

    let submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "submit-btn";
    submitBtn.textContent = "📤 Publicar Opinión";

    form.append(
        titleLabel,
        titleInput,
        countTitle,
        categoryLabel,
        categoryInput,
        contentLabel,
        contentInput,
        countContent,
        submitBtn
    );

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!titleInput.value.trim() || !contentInput.value.trim()) {
            alert("Por favor completa todos los campos");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "📤 Publicando...";

        const user = JSON.parse(localStorage.getItem("user"));

        if (!categoryInput.value) {
            alert("Por favor selecciona una categoría");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/gestorOpiniones/v1/posts/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    titulo: titleInput.value,
                    categoria: categoryInput.value,
                    texto: contentInput.value,
                    autor: user.id
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("¡Opinión publicada exitosamente!");
                titleInput.value = "";
                contentInput.value = "";
                countTitle.textContent = "0/100";
                countContent.textContent = "0/2000";
                setTimeout(() => {
                    window.location.href = "app.html";
                }, 1000);
            } else {
                alert("Error al publicar: " + (data.message || "Intenta nuevamente"));
            }
        } catch (error) {
            alert("Error en la conexión");
            console.error(error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "📤 Publicar Opinión";
        }
    });

    section.append(title, form);
    return section;
}

export { crearPost };
