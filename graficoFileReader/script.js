let stringa;
let righe = [];
let tabella = [];
let datiNumerici = [];
const canvas = document.getElementById("grafico");
const grafico = canvas.getContext("2d");

function leggi(input) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        stringa = reader.result;
        inserisci();
    });

    reader.readAsText(file);
}

function inserisci() {
    document.getElementById("titolo").textContent = "Informazioni del file";
    const tab = document.getElementById("tabella");
    tab.innerHTML = "";

    righe = stringa.split("\n").map(riga => riga.split(","));
    tabella = [...righe];

    righe.forEach((riga, r) => {
        const nuovaRiga = tab.insertRow();
        riga.forEach((valore, c) => {
            const cella = nuovaRiga.insertCell(c);
            cella.textContent = valore.replace(/"/g, '');
        });
    });

    datiNumerici = righe.slice(1).map(riga => Number(riga[1].replace(/"/g, ''))).filter(val => !isNaN(val));

    disegna();
}

function disegna() {
    grafico.clearRect(0, 0, canvas.width, canvas.height);
    grafico.beginPath();
    grafico.moveTo(865, 580);
    grafico.lineTo(30, 580);
    grafico.lineTo(30, 0);
    grafico.stroke();

    grafico.font = "12px Arial";

    righe.slice(1).forEach((riga, i) => {
        const xgrafico = (840 / (righe.length - 1)) * (i + 1);
        grafico.fillText(riga[0].replace(/"/g, ' '), xgrafico - 10, 595);
    });

    const indiceMax = Math.ceil(Math.max(...datiNumerici) / 1000) * 1000;
    const indiceMin = Math.floor(Math.min(...datiNumerici) / 1000) * 1000;
    const differenza = indiceMax - indiceMin;
    const scalaY = 560 / differenza;

    Array.from({ length: 6 }).forEach((_, i) => {
        const yPos = 580 - (scalaY * (i * differenza / 5));
        grafico.fillText(indiceMin + (i * differenza / 5), 0, yPos);
    });

    grafico.beginPath();
    datiNumerici.forEach((val, i) => {
        const xgrafico = (840 / (righe.length - 1)) * (i + 1);
        const ygrafico = 580 - (scalaY * (val - indiceMin));

        i === 0 ? grafico.moveTo(xgrafico, ygrafico) : grafico.lineTo(xgrafico, ygrafico);
    });

    grafico.stroke();
}
