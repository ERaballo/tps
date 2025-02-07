
//variabili
let stringa; 
let righe = []; 
let tabella = []; 
let datiNumerici = [];


const canvas = document.getElementById("grafico");
const grafico = canvas.getContext("2d");

// legge il file
function leggi(input) {
    if (input.files.length === 0) {
        alert("Seleziona un file valido.");
        return;
    }

    let file = input.files[0]; 
    let reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function () { 
        stringa = reader.result; 
        inserisci();
    };
}

// mostra nella tabella
function inserisci() {
    document.getElementById("titolo").innerHTML = "Informazioni del file";
    let tab = document.getElementById("tabella");
    
    righe = stringa.split("\n");
    tab.innerHTML = ""; 

    
    for (let n = 0; n < righe.length; n++) {
        tabella[n] = righe[n].split(","); 
        let nuovaRiga = tab.insertRow(); 

        for (let z = 0; z < tabella[n].length; z++) {
            let cella = nuovaRiga.insertCell(z);
            cella.innerHTML = tabella[n][z].replace(/"/g, '');
        }
    } 

    
    datiNumerici = [];
    
    // Estrae dati numerici
    for (let z = 1; z < righe.length; z++) {
        let valore = Number(tabella[z][1].replace(/"/g, ''));
        if (!isNaN(valore)) {
            datiNumerici.push(valore);
        } 
    }

    
    disegna();
}

// Fdisegna il grafico
function disegna() {
    grafico.clearRect(0, 0, canvas.width, canvas.height);
    grafico.beginPath();
    
    //assi
    grafico.moveTo(865, 580);
    grafico.lineTo(30, 580);
    grafico.lineTo(30, 0);
    grafico.stroke();

    grafico.font="11px Arial";

    // numeri su asse X
    righe.slice(1).forEach((riga, i) => {
        const xgrafico = (840 / (righe.length - 1)) * (i + 1);
        grafico.fillText(riga[0].replace(/"/g, ' '), xgrafico -10, 595);
    });

    // divido asse Y
    const indiceMax = Math.ceil(Math.max(...datiNumerici) / 1000) * 1000;
    const indiceMin = Math.floor(Math.min(...datiNumerici) / 1000) * 1000;
    const differenza = indiceMax - indiceMin;
    const scalaY = 560 / differenza; 

    // numeri asse Y
    Array.from({ length: 6 }).forEach((_, i) => {
        const yPos = 580 - (scalaY * (i * differenza / 5));
        grafico.fillText(indiceMin + (i * differenza / 5), 0, yPos);
    });

    // disegna linea
    grafico.beginPath();
    datiNumerici.forEach((val, i) => {
        const xgrafico = (840 / (righe.length - 1)) * (i + 1);
        const ygrafico = 580 - (scalaY * (val - indiceMin));
        if (i === 0) {
            grafico.moveTo(xgrafico, ygrafico);
        } else {
            grafico.lineTo(xgrafico, ygrafico);
        }
    });

    grafico.stroke();
}
