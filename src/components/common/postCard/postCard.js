/* Componente Tarjeta de Opinión (Post) */

function PostCard(post, onDelete, onEdit) {
    let card = document.createElement("div");
    card.className = "post-card";

    let header = document.createElement("div");
    header.className = "post-header";

    let authorInfo = document.createElement("div");
    authorInfo.className = "author-info";

    let authorName = document.createElement("p");
    authorName.className = "author-name";
    authorName.textContent = post.autor?.nombre || "Usuario Anónimo";

    let date = document.createElement("span");
    date.className = "post-date";
    date.textContent = new Date(post.createdAt || Date.now()).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    authorInfo.append(authorName, date);

    let actions = document.createElement("div");
    actions.className = "post-actions";

    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthor = user?.id === post.autor?._id || user?.id === post.autor;

    if (isAuthor) {
        let editBtn = document.createElement("button");
        editBtn.className = "action-btn edit";
        editBtn.innerHTML = "✎";
        editBtn.title = "Editar";
        editBtn.addEventListener("click", () => onEdit(post));
        actions.appendChild(editBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "action-btn delete";
        deleteBtn.innerHTML = "✕";
        deleteBtn.title = "Eliminar";
        deleteBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas eliminar esta opinión?")) {
                onDelete(post._id);
            }
        });
        actions.appendChild(deleteBtn);
    }

    header.append(authorInfo, actions);

    let title = document.createElement("h3");
    title.className = "post-title";
    title.textContent = post.titulo;

    let content = document.createElement("p");
    content.className = "post-content";
    content.textContent = post.texto;

    let footer = document.createElement("div");
    footer.className = "post-footer";

    let statsContainer = document.createElement("div");
    statsContainer.className = "post-stats";

    let commentCount = document.createElement("span");
    commentCount.className = "stat-item";
    commentCount.innerHTML = `💬 ${post.comentarios?.length || 0} comentarios`;

    statsContainer.appendChild(commentCount);
    footer.appendChild(statsContainer);

    card.append(header, title, content, footer);
    return card;
}

export { PostCard };
