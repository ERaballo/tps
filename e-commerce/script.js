// Questa funzione serve a caricare un file JSON tramite una richiesta HTTP
function caricaJSON(percorso, Finito) {
    let richiesta = new XMLHttpRequest();               
    richiesta.open("GET", percorso, true);              

    richiesta.onreadystatechange = function () {        
        if (richiesta.readyState === 4 && richiesta.status === 200) {  
            Finito(JSON.parse(richiesta.responseText));         
        }
    };

    richiesta.send();                                   
}


// Funzione per leggere un file CSV
function caricaCSV(percorso, Finito) {
    let richiesta = new XMLHttpRequest();              
    richiesta.open("GET", percorso, true);              

    richiesta.onreadystatechange = function () {       
        if (richiesta.readyState === 4 && richiesta.status === 200) {  
            Finito(conversioneCSV(richiesta.responseText));    
        };
    }
    richiesta.send();                                   
}



// Funzione per leggere un file XML
function caricaXML(percorso, Finito) {
    let richiesta = new XMLHttpRequest();              
    richiesta.open("GET", percorso, true);              

    richiesta.onreadystatechange = function () {
        if (richiesta.readyState === 4 && richiesta.status === 200) {
            let parser = new DOMParser();               
            let xmlConvertito = parser.parseFromString(richiesta.responseText, "application/xml");  
            Finito(conversioneXML(xmlConvertito));   
        }
    };

    richiesta.send();                                   
}


// Converte un CSV in un array di oggetti
function conversioneCSV(testo) {
    let righe = testo.trim().split("\n");               
    let dati = righe.slice(1);                          
    let lista = [];                                    

    for (let i = 0; i < dati.length; i++) {             
        let campi = dati[i].split(";");                 

        lista.push({                                    
            id: campi[0],
            nome: campi[1],
            marca: campi[2],
            prezzo: parseFloat(campi[3]),
            immagine: campi[4]
        });
    }
    return lista;                                       
}


// Converte file XML in array di oggetti
function conversioneXML(xml) {
    let listaGiochi = xml.getElementsByTagName("gioco");    
    let raccolta = [];                                      

    for (let i = 0; i < listaGiochi.length; i++) {
        let g = listaGiochi[i];                             

        raccolta.push({
            id: g.getElementsByTagName("id")[0].textContent,
            nome: g.getElementsByTagName("nome")[0].textContent,
            marca: g.getElementsByTagName("marca")[0].textContent,
            prezzo: parseFloat(g.getElementsByTagName("prezzo")[0].textContent),
            immagine: g.getElementsByTagName("immagine")[0].textContent
        });
    }
    return raccolta;                                        
}



let listaProdotti = [];


// Carica JSON CSV e XML e li unisce
function caricaTuttiIDati() {
    caricaJSON("giochi.json", function (datiJSON) {
        caricaCSV("giochi.csv", function (datiCSV) {
            caricaXML("giochi.xml", function (datiXML) {

                listaProdotti = datiJSON.concat(datiCSV).concat(datiXML);  
                preparaFiltri();                                          
                mostraProdotti();                                          
            });
        });
    });
}


// caricamento apertura pagina
caricaTuttiIDati();


// Crea il filtro marche
function preparaFiltri() {
    let selettore = document.getElementById("marcaSelect"); 
    let marcheUniche = [];
    let controllo = {};                                     

    for (let i = 0; i < listaProdotti.length; i++) {
        if (!controllo[listaProdotti[i].marca]) {           
            controllo[listaProdotti[i].marca] = true;        
            marcheUniche.push(listaProdotti[i].marca);      
        }
    }

    selettore.innerHTML = "<option value=''>Tutte le Marche</option>";  

    for (let j = 0; j < marcheUniche.length; j++) {
        selettore.innerHTML += "<option>" + marcheUniche[j] + "</option>";
    }

    selettore.onchange = mostraProdotti;                  
}

// Mostra i prodotti nella pagina
function mostraProdotti() {
    let marcaScelta = document.getElementById("marcaSelect").value;    
    let prodottiDaMostrare = listaProdotti;                          

    if (marcaScelta) {                                                
        let filtrati = [];

        for (let i = 0; i < prodottiDaMostrare.length; i++) {
            if (prodottiDaMostrare[i].marca === marcaScelta) {
                filtrati.push(prodottiDaMostrare[i]);
            }
        }

        prodottiDaMostrare = filtrati;                               
    }

    let contenitore = document.getElementById("prodotti");             
    contenitore.innerHTML = "";                                       

    for (let j = 0; j < prodottiDaMostrare.length; j++) {
        let prodotto = prodottiDaMostrare[j];

        let card = document.createElement("div");                     
        card.className = "card";

        card.innerHTML =
            "<img src='" + prodotto.immagine + "' alt='" + prodotto.nome + "'>" +
            "<h3>" + prodotto.nome + "</h3>" +
            "<p>" + prodotto.marca + "</p>" +
            "<p><b>€" + prodotto.prezzo.toFixed(2) + "</b></p>" +
            "<button onclick='aggiungiAlCarrello(" + prodotto.id + ")'>Aggiungi al carrello</button>";

        contenitore.appendChild(card);
    }
}


// Aggiunge un prodotto al carrello
function aggiungiAlCarrello(id) {
    let carrello = JSON.parse(localStorage.getItem("carrello")) || [];   
    let prodottoDaAggiungere = null;

    for (let i = 0; i < listaProdotti.length; i++) {                    
        if (listaProdotti[i].id == id) {
            prodottoDaAggiungere = listaProdotti[i];
            break;
        }
    }

    if (prodottoDaAggiungere) {                                         
        carrello.push(prodottoDaAggiungere);                            
        localStorage.setItem("carrello", JSON.stringify(carrello));     
    }
}
