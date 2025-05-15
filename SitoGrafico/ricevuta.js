document.addEventListener("DOMContentLoaded", () => {
  const prodottiAcquistati = JSON.parse(localStorage.getItem("carrello")) || [];

  const contenuto = document.getElementById("contenuto-ricevuta");
  const subtotaleElem = document.getElementById("subtotale");
  const ivaElem = document.getElementById("iva");
  const totaleElem = document.getElementById("totale");

  let subtotale = 0;

  prodottiAcquistati.forEach(prodotto => {
    const riga = document.createElement("div");
    riga.className = "linea";

    const nome = document.createElement("div");
    nome.textContent = prodotto.nome;

    const prezzo = document.createElement("div");
    prezzo.textContent = "€ " + prodotto.prezzo.toFixed(2);

    riga.appendChild(nome);
    riga.appendChild(prezzo);
    contenuto.appendChild(riga);

    subtotale += prodotto.prezzo;
  });

  subtotaleElem.textContent = "€ " + subtotale.toFixed(2);

  const iva = subtotale * 0.07;
  ivaElem.textContent = "€ " + iva.toFixed(2);

  const totale = subtotale + iva;
  totaleElem.textContent = "€ " + totale.toFixed(2);
});
