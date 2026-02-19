/* Sección Mi Perfil */

function miPerfil() {
    let section = document.createElement("section");
    section.id = "mi-perfil";

    const user = JSON.parse(localStorage.getItem("user"));

    let title = document.createElement("h1");
    title.textContent = "👤 Mi Perfil";

    let profileCard = document.createElement("div");
    profileCard.className = "profile-card";

    let avatarContainer = document.createElement("div");
    avatarContainer.className = "avatar-container";
    let avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = user.nombre.charAt(0).toUpperCase();
    avatarContainer.appendChild(avatar);

    let profileInfo = document.createElement("div");
    profileInfo.className = "profile-info";

    let nombre = document.createElement("h2");
    nombre.textContent = user.nombre;

    let username = document.createElement("p");
    username.className = "profile-username";
    username.textContent = `@${user.username}`;

    let userId = document.createElement("p");
    userId.className = "profile-id";
    userId.textContent = `ID: ${user.id.substring(0, 12)}...`;

    profileInfo.append(nombre, username, userId);
    profileCard.append(avatarContainer, profileInfo);

    section.append(title, profileCard);
    return section;
}

export { miPerfil };
