/* Componente Tarjeta de Comentario */

function CommentCard(comment, onDelete) {
    let card = document.createElement("div");
    card.className = "comment-card";

    let header = document.createElement("div");
    header.className = "comment-header";

    let author = document.createElement("p");
    author.className = "comment-author";
    author.textContent = comment.autor?.nombre || "Usuario Anónimo";

    let date = document.createElement("span");
    date.className = "comment-date";
    date.textContent = new Date(comment.createdAt || Date.now()).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    let actions = document.createElement("div");
    actions.className = "comment-actions";

    const user = JSON.parse(localStorage.getItem("user"));
    const isAuthor = user?.id === comment.autor?._id || user?.id === comment.autor;

    if (isAuthor) {
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "comment-delete";
        deleteBtn.innerHTML = "✕";
        deleteBtn.title = "Eliminar comentario";
        deleteBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de eliminar este comentario?")) {
                onDelete(comment._id);
            }
        });
        actions.appendChild(deleteBtn);
    }

    header.append(author, date, actions);

    let content = document.createElement("p");
    content.className = "comment-content";
    content.textContent = comment.texto;

    card.append(header, content);
    return card;
}

export { CommentCard };
