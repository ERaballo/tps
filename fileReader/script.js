let stringa;
let righe = [];
let tabella = [];

function leggi(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        stringa = event.target.result;
        inserisci();
    };

    reader.readAsText(file);
}

function inserisci() {
    document.getElementById("titolo").innerHTML = "Contenuto del file:";
    let tab = document.getElementById("tabella");
    righe = stringa.split("\n");

    righe.forEach(function(riga, index) {
        tabella[index] = riga.split(",");
        let nuovaRiga = tab.insertRow();
        let anno = nuovaRiga.insertCell(0);
        anno.innerHTML = rimuoviDoppiApici(tabella[index][0]);
        let numero = nuovaRiga.insertCell(1);
        numero.innerHTML = rimuoviDoppiApici(tabella[index][1]);
    });
}

function rimuoviDoppiApici(stringa) {
    let risultato = "";
    for (let i = 0; i < stringa.length; i++) {
        if (stringa[i] !== '"') {
            risultato += stringa[i];
        }
    }
    return risultato;
}
