// ---------------------------------------------------------
// LETTURA FILE ESTERNI con XMLHttpRequest (NO FETCH)
// ---------------------------------------------------------
function leggiFile(percorso) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", percorso, false);
    xhr.send();
    return xhr.responseText;
}

// --- JSON ---
function caricaJSON() {
    return JSON.parse(leggiFile("data/giochi.json"));
}

// --- XML ---
function caricaXML() {
    const txt = leggiFile("data/giochi.xml");
    const xml = new DOMParser().parseFromString(txt, "text/xml");

    return [...xml.getElementsByTagName("gioco")].map(g => ({
        id: g.querySelector("id").textContent,
        nome: g.querySelector("nome").textContent,
        prezzo: parseFloat(g.querySelector("prezzo").textContent),
        marca: g.querySelector("marca").textContent,
        img: g.querySelector("img").textContent,
        descrizione: g.querySelector("descrizione").textContent
    }));
}

// --- CSV ---
function caricaCSV() {
    const txt = leggiFile("data/giochi.csv");
    const righe = txt.trim().split("\n");
    righe.shift();
    return righe.map(r => {
        const campi = r.split(",");
        return {
            id: campi[0],
            nome: campi[1],
            prezzo: parseFloat(campi[2]),
            marca: campi[3],
            img: campi[4],
            descrizione: campi[5]
        };
    });
}

// ---------------------------------------------------------
// CARRELLO
// ---------------------------------------------------------
function getCarrello() {
    return JSON.parse(localStorage.getItem("carrello"));
}

function salvaCarrello(c) {
    localStorage.setItem("carrello", JSON.stringify(c));
}

function aggiungiAlCarrello(gioco) {
    const c = getCarrello();
    c.push(gioco);
    salvaCarrello(c);
}

// ---------------------------------------------------------
// HOME PAGE
// ---------------------------------------------------------
function caricaCatalogo() {
    const dati = [
        ...caricaJSON(),
        ...caricaXML(),
        ...caricaCSV()
    ];

    const div = document.getElementById("catalogo");

    dati.forEach(g => {
        const card = document.createElement("div");
        card.className = "card";

        const img = g.img.trim() === "" ?
            `<div class="missing-img">Immagine mancante</div>` :
            `<img src="${g.img}" alt="${g.nome}">`;

        card.innerHTML = `
            ${img}
            <div class="info-box">
                <h3>${g.nome}</h3>
                <p>${g.prezzo.toFixed(2)} €</p>
            </div>
        `;

        card.onclick = () => {
            localStorage.setItem("dettaglio", JSON.stringify(g));
            window.location.href = "dettagli.html";
        };

        div.appendChild(card);
    });
}

// ---------------------------------------------------------
// DETTAGLI
// ---------------------------------------------------------
function mostraDettaglio() {
    const g = JSON.parse(localStorage.getItem("dettaglio"));

    const img = g.img.trim() === "" ?
        `<div class="missing-img" style="max-width:300px;margin:auto;">Immagine mancante</div>` :
        `<img src="${g.img}" style="width:300px">`;

    document.getElementById("scheda").innerHTML = `
        <h2>${g.nome}</h2>
        ${img}
        <p><strong>Marca:</strong> ${g.marca}</p>
        <p>${g.descrizione}</p>
        <p><strong>Prezzo:</strong> ${g.prezzo.toFixed(2)} €</p>
    `;

    document.getElementById("addCarrello").onclick = () => aggiungiAlCarrello(g);
}

// ---------------------------------------------------------
// CARRELLO
// ---------------------------------------------------------
function mostraCarrello() {
    const c = getCarrello();
    const div = document.getElementById("carrelloProdotti");

    c.forEach(g => {
        const img = g.img.trim() === "" ?
            `<div class="missing-img">Immagine mancante</div>` :
            `<img src="${g.img}" alt="${g.nome}">`;

        div.innerHTML += `
            <div class="card">
                ${img}
                <div class="info-box">
                    <h3>${g.nome}</h3>
                    <p>${g.prezzo.toFixed(2)} €</p>
                </div>
            </div>
        `;
    });
}

// ---------------------------------------------------------
// ACQUISTA
// ---------------------------------------------------------
function acquista() {
    const c = getCarrello();
    localStorage.setItem("acquisto", JSON.stringify(c));
    window.location.href = "ricevuta.html";
}

// ---------------------------------------------------------
// RICEVUTA
// ---------------------------------------------------------
function mostraRicevuta() {
    const acquisto = JSON.parse(localStorage.getItem("acquisto"));
    let div = document.getElementById("listaAcquisti");

    let totale = 0;

    acquisto.forEach(g => {
        totale += g.prezzo;
        div.innerHTML += `<p>${g.nome} — ${g.prezzo.toFixed(2)} €</p>`;
    });

    document.getElementById("totale").innerText =
        "Totale: " + totale.toFixed(2) + " €";
}

// ---------------------------------------------------------
// INIT: controlla che pagina stai visualizzando
// ---------------------------------------------------------
window.onload = () => {

    if (document.getElementById("catalogo")) caricaCatalogo();
    if (document.getElementById("scheda")) mostraDettaglio();
    if (document.getElementById("carrelloProdotti")) mostraCarrello();
    if (document.getElementById("listaAcquisti")) mostraRicevuta();

    if (!localStorage.getItem("carrello"))
        localStorage.setItem("carrello", "[]");
};
