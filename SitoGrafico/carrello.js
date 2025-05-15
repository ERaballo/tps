document.addEventListener("DOMContentLoaded", () => {
  const contenuto = document.getElementById("contenuto-carrello");
  const totalePrezzo = document.getElementById("totale-prezzo");
  let carrello = JSON.parse(localStorage.getItem("carrello")) || [];

  if (carrello.length === 0) {
    contenuto.textContent = "Il carrello è vuoto.";
    totalePrezzo.textContent = "Totale: €0";
    return;
  }

  let totale = 0;

  carrello.forEach(prodotto => {
    const card = document.createElement("div");
    card.className = "scheda";

    const img = document.createElement("img");
    img.src = prodotto.immagine;
    img.alt = prodotto.nome;
    img.width = 150;

    const nome = document.createElement("h2");
    nome.textContent = prodotto.nome;

    const prezzo = document.createElement("p");
    prezzo.textContent = "Prezzo: €" + prodotto.prezzo;

    const specs = document.createElement("ul");
    for (let chiave in prodotto.specifiche) {
      const li = document.createElement("li");
      li.textContent = `${chiave}: ${prodotto.specifiche[chiave]}`;
      specs.appendChild(li);
    }

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(prezzo);
    card.appendChild(specs);
    contenuto.appendChild(card);

    totale += parseFloat(prodotto.prezzo);
  });

  totalePrezzo.textContent = "Totale: €" + totale.toFixed(2);
});

function svuotaCarrello() {
  localStorage.removeItem("carrello");
  location.reload();
}
