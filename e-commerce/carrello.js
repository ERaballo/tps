let boxCarrello = document.getElementById("carrelloContainer");
let bottoneScontrino = document.getElementById("stampaScontrino");
let listaCarrello = JSON.parse(localStorage.getItem("carrello")) || [];

function mostraCarrello() {
    boxCarrello.innerHTML = "";

    // se il carrello è vuoto
    if (listaCarrello.length === 0) {
        boxCarrello.innerHTML = "<p>Il carrello è vuoto.</p>";
        return;
    }

    // ciclo su tutti i prodotti nel carrello
    for (let i = 0; i < listaCarrello.length; i++) {
        let prodotto = listaCarrello[i];
        let rigaProdotto = document.createElement("div");
        rigaProdotto.innerHTML =
            prodotto.nome +
            " - €" + prodotto.prezzo.toFixed(2) +
            " <button onclick='rimuoviDalCarrello(" + i + ")'>Rimuovi</button>";
        boxCarrello.appendChild(rigaProdotto);
    }
}

// Rimuove un prodotto
function rimuoviDalCarrello(indice) {
    listaCarrello.splice(indice, 1);
    localStorage.setItem("carrello", JSON.stringify(listaCarrello));
    mostraCarrello();
}

// porta allo scontrino
bottoneScontrino.addEventListener("click", function () {
    window.location.href = "scontrino.html";
});


mostraCarrello();
