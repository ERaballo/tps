window.onload = function () {

    // legge il carrello dal localStorage
    let articoliCarrello = JSON.parse(localStorage.getItem("carrello")) || [];

    let boxListaProdotti = document.getElementById("listaProdotti");
    let boxData = document.getElementById("data");
    let boxTotale = document.getElementById("totale");
    // Se il carrello è vuoto
    if (articoliCarrello.length === 0) {
        boxListaProdotti.innerHTML = "<p>Il carrello è vuoto.</p>";
        boxTotale.textContent = "";
        return;
    }

    // totale da pagare
    let totaleDaPagare = 0;

    for (let i = 0; i < articoliCarrello.length; i++) {
        let prodotto = articoliCarrello[i]; 

        // crea un div per ogni riga prodotto
        let riga = document.createElement("div");
        riga.className = "rigaProdotto";

        // inserisce il nome del prodotto e il prezzo nella riga
        riga.innerHTML =
            "<span>" + prodotto.nome + "</span>" +
            "<span>€" + prodotto.prezzo.toFixed(2) + "</span>";

        // aggiunge la riga al contenitore dei prodotti
        boxListaProdotti.appendChild(riga);

        totaleDaPagare += prodotto.prezzo;
    }

    boxTotale.textContent = "Totale: €" + totaleDaPagare.toFixed(2);
};
