/* Componente Button */

function Button(text, id, icon, callback) {
    let button = document.createElement("div");
    button.className = "button";
    button.classList.add(id);
    
    let buttonImage = document.createElement("div");
    buttonImage.className = "button-image";
    
    let img = document.createElement("img");
    img.src = `../assets/icons/${icon}`;
    img.alt = text;
    buttonImage.appendChild(img);
    
    let buttonText = document.createElement("div");
    buttonText.className = "button-text";
    buttonText.textContent = text;
    
    button.appendChild(buttonImage);
    button.appendChild(buttonText);
    
    button.addEventListener("click", callback);
    
    return button;
}

export { Button };
