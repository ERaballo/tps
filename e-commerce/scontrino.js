window.onload = function () {
    var carrello = JSON.parse(localStorage.getItem("carrello")) || [];

    var lista = document.getElementById("listaProdotti");
    var data = document.getElementById("data");
    var totaleDOM = document.getElementById("totale");

    // Data e ora
    data.textContent = "Data: " + new Date().toLocaleString();

    if (carrello.length === 0) {
        lista.innerHTML = "<p>Il carrello è vuoto.</p>";
        totaleDOM.textContent = "";
        return;
    }

    var totale = 0;

    for (var i = 0; i < carrello.length; i++) {
        var p = carrello[i];

        var div = document.createElement("div");
        div.className = "rigaProdotto";
        div.innerHTML =
            "<span>" + p.nome + "</span>" +
            "<span>€" + p.prezzo.toFixed(2) + "</span>";

        lista.appendChild(div);
        totale += p.prezzo;
    }

    totaleDOM.textContent = "Totale: €" + totale.toFixed(2);
};
