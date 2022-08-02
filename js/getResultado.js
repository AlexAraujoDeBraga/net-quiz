getResultado = JSON.parse(sessionStorage.getItem('pontos'));
document.getElementById("pontos").innerHTML = getResultado;

tagImg = document.createElement("img");

if (getResultado <= 40) {
    let element;
    tagImg.setAttribute("src", "./assets/bronze-medal.png");
    tagImg.setAttribute("width", "80px");
    element = document.getElementById("imagem");
    element.appendChild(tagImg); 
    document.getElementById("tipoMedalha").innerHTML = "bronze.";
} else if (getResultado <= 60) {
    let element;
    tagImg.setAttribute("src", "./assets/silver-medal.png");
    tagImg.setAttribute("width", "80px");
    element = document.getElementById("imagem");
    element.appendChild(tagImg);
    document.getElementById("tipoMedalha").innerHTML = "prata."; 
} else {
    let element;
    tagImg.setAttribute("src", "./assets/gold-medal.png");
    tagImg.setAttribute("width", "80px");
    element = document.getElementById("imagem");
    element.appendChild(tagImg); 
    document.getElementById("tipoMedalha").innerHTML = "ouro.";
}  