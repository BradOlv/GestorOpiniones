/* Sección Feed - Listado de opiniones */

import { PostCard } from "../../common/postCard/postCard.js";
import { CommentCard } from "../../common/commentCard/commentCard.js";

function feed() {
    let section = document.createElement("section");
    section.id = "feed";

    let header = document.createElement("div");
    header.className = "feed-header";

    let title = document.createElement("h1");
    title.textContent = "📰 Feed de Opiniones";

    let refreshBtn = document.createElement("button");
    refreshBtn.className = "refresh-btn";
    refreshBtn.innerHTML = "🔄 Actualizar";
    refreshBtn.addEventListener("click", () => location.reload());

    header.append(title, refreshBtn);

    let postsContainer = document.createElement("div");
    postsContainer.id = "posts-container";
    postsContainer.className = "posts-container";

    section.append(header, postsContainer);

    // Cargar posts
    loadPosts(postsContainer);

    return section;
}

async function loadPosts(container) {
    try {
        container.innerHTML = '<div class="loading-spinner">Cargando opiniones...</div>';

        const response = await fetch("http://localhost:3001/gestorOpiniones/v1/posts/all");
        const data = await response.json();

        if (data.success && data.posts.length > 0) {
            container.innerHTML = "";
            
            data.posts.forEach(post => {
                let postElement = PostCard(
                    post,
                    (postId) => deletePost(postId, container),
                    (post) => editPost(post)
                );

                // Agregar sección de comentarios
                let commentsSection = document.createElement("div");
                commentsSection.className = "comments-section";

                let toggleBtn = document.createElement("button");
                toggleBtn.className = "toggle-comments";
                toggleBtn.innerHTML = "💬 Ver comentarios";
                let isOpen = false;

                let commentsContainer = document.createElement("div");
                commentsContainer.className = "comments-container";
                commentsContainer.style.display = "none";

                toggleBtn.addEventListener("click", async () => {
                    if (!isOpen) {
                        await loadCommentsForPost(post._id, commentsContainer);
                        commentsContainer.style.display = "block";
                        toggleBtn.innerHTML = "💬 Ocultar comentarios";
                        isOpen = true;
                    } else {
                        commentsContainer.style.display = "none";
                        toggleBtn.innerHTML = "💬 Ver comentarios";
                        isOpen = false;
                    }
                });

                let addCommentForm = document.createElement("div");
                addCommentForm.className = "add-comment-form";

                let textarea = document.createElement("textarea");
                textarea.placeholder = "Agrega tu comentario aquí...";
                textarea.maxLength = 500;

                let submitBtn = document.createElement("button");
                submitBtn.textContent = "Comentar";
                submitBtn.className = "submit-comment";

                submitBtn.addEventListener("click", async () => {
                    if (textarea.value.trim()) {
                        await addComment(post._id, textarea.value, commentsContainer);
                        textarea.value = "";
                        toggleBtn.click();
                        toggleBtn.click();
                    }
                });

                addCommentForm.append(textarea, submitBtn);
                commentsSection.append(toggleBtn, commentsContainer, addCommentForm);

                postElement.appendChild(commentsSection);
                container.appendChild(postElement);
            });
        } else {
            container.innerHTML = '<div class="empty-state">📭 No hay opiniones aún. ¡Sé el primero en compartir!</div>';
        }
    } catch (error) {
        container.innerHTML = '<div class="error-message">❌ Error al cargar las opiniones. Intenta nuevamente.</div>';
        console.error(error);
    }
}

async function loadCommentsForPost(postId, container) {
    try {
        const response = await fetch(`http://localhost:3001/gestorOpiniones/v1/comments/post/${postId}`);
        const data = await response.json();

        container.innerHTML = "";

        if (data.success && data.comments.length > 0) {
            data.comments.forEach(comment => {
                container.appendChild(CommentCard(
                    comment,
                    (commentId) => deleteComment(commentId, container)
                ));
            });
        } else {
            container.innerHTML = '<p class="no-comments">Sin comentarios aún</p>';
        }
    } catch (error) {
        container.innerHTML = '<p class="error">Error al cargar comentarios</p>';
        console.error(error);
    }
}

async function addComment(postId, contenido, container) {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
        const response = await fetch("http://localhost:3001/gestorOpiniones/v1/comments/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                texto: contenido,
                post: postId,
                autor: user.id
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("¡Comentario agregado exitosamente!");
        } else {
            alert("Error al agregar comentario");
        }
    } catch (error) {
        alert("Error en la conexión");
        console.error(error);
    }
}

async function deleteComment(commentId, container) {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
        const response = await fetch(`http://localhost:3001/gestorOpiniones/v1/comments/delete/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uid: user.id })
        });

        const data = await response.json();

        if (data.success) {
            alert("Comentario eliminado");
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}

async function deletePost(postId, container) {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
        const response = await fetch(`http://localhost:3001/gestorOpiniones/v1/posts/delete/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uid: user.id })
        });

        const data = await response.json();

        if (data.success) {
            alert("Opinión eliminada exitosamente");
            location.reload();
        }
    } catch (error) {
        alert("Error al eliminar");
        console.error(error);
    }
}

async function editPost(post) {
    const titulo = prompt("Editar título:", post.titulo);
    if (!titulo) return;

    const texto = prompt("Editar opinión:", post.texto);
    if (!texto) return;

    const user = JSON.parse(localStorage.getItem("user"));

    try {
        const response = await fetch(`http://localhost:3001/gestorOpiniones/v1/posts/update/${post._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                texto,
                categoria: post.categoria,
                uid: user.id
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("Opinión actualizada exitosamente");
            location.reload();
        } else {
            alert("Error al actualizar: " + (data.message || "Intenta nuevamente"));
        }
    } catch (error) {
        alert("Error en la conexión");
        console.error(error);
    }
}

export { feed };
