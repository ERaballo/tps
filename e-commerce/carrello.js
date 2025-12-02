const cont = document.getElementById("carrelloContainer");
const btn = document.getElementById("stampaScontrino");

let carrello = JSON.parse(localStorage.getItem("carrello")) || [];


function mostraCarrello() {
    cont.innerHTML = "";

    if (carrello.length === 0) {
        cont.innerHTML = "<p>Il carrello è vuoto.</p>";
        return;
    }

    carrello.forEach((p, i) => {
        const riga = document.createElement("div");
        riga.innerHTML = `
            ${p.nome} - €${p.prezzo.toFixed(2)}
            <button onclick="rimuovi(${i})">Rimuovi</button>
        `;
        cont.appendChild(riga);
    });
}


function rimuovi(i) {
    carrello.splice(i, 1);
    localStorage.setItem("carrello", JSON.stringify(carrello));
    mostraCarrello();
}


document.getElementById("stampaScontrino").addEventListener("click", function () {
    window.location.href = "scontrino.html";
});



mostraCarrello();
