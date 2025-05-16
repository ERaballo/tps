let prodotti = [];

function mostraProdotti() {
  document.getElementById("titolo").textContent = "Store di Videogiochi";
  const contenitore = document.getElementById("contenitore");
  contenitore.innerHTML = "";

  prodotti.forEach((prodotto, i) => {
    const link = document.createElement("a");
    link.href = `dettagli.html?index=${i}`;
    link.style.textDecoration = "none";

    const card = document.createElement("div");
    card.className = "scheda";

    const nome = document.createElement("h2");
    nome.textContent = prodotto.nome;

    const prezzo = document.createElement("p");
    prezzo.textContent = "Prezzo: €" + prodotto.prezzo;

    const img = document.createElement("img");
    img.src = prodotto.immagine;
    img.alt = prodotto.nome;
    img.width = 200;

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
    link.appendChild(card);
    contenitore.appendChild(link);
  });
}

function mostraDettaglioProdotto() {
  const params = new URLSearchParams(window.location.search);
  const index = parseInt(params.get("index"));

  if (isNaN(index)) {
    document.getElementById("nome-prodotto").textContent = "Prodotto non trovato";
    return;
  }

  fetch("./dati.json")
    .then(response => response.json())
    .then(json => {
      prodotti = json;
      const prodotto = prodotti[index];
      if (!prodotto) {
        document.getElementById("nome-prodotto").textContent = "Prodotto non trovato";
        return;
      }

      document.getElementById("immagine").src = prodotto.immagine;
      document.getElementById("immagine").alt = prodotto.nome;
      document.getElementById("nome-prodotto").textContent = prodotto.nome;
      document.getElementById("prezzo-prodotto").textContent = "Prezzo: €" + prodotto.prezzo;
      document.getElementById("recensioni").textContest=prodotto.recensioni;
      document.getElementById("data-di-rilascio").textContest=prodotto.data;
      document.getElementById("sviluppatore").textContest=prodotto.Sviluppatore;
      document.getElementById("editore").textContest=prodotto.editore;

      document.getElementById("aggiungi-carrello").addEventListener("click", () => {
        let carrello = JSON.parse(localStorage.getItem("carrello")) || [];
        carrello.push(prodotto);
        localStorage.setItem("carrello", JSON.stringify(carrello));
        alert("Prodotto aggiunto al carrello!");
      });
    })
    .catch(error => {
      console.error("Errore nel caricamento del JSON:", error);
    });
}

if (window.location.pathname.endsWith("dettagli.html")) {
  mostraDettaglioProdotto();
} else {
  fetch("dati.json")
    .then(response => response.json())
    .then(json => {
      prodotti = json;
      mostraProdotti();
    })
    .catch(error => {
      console.error("Errore nel caricamento dei dati:", error);
    });
}
