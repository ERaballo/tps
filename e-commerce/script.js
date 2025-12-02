function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
}

function loadCSV(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(parseCSV(xhr.responseText));
        }
    };
    xhr.send();
}

function loadXML(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(xhr.responseText, "application/xml");
            callback(parseXML(xml));
        }
    };
    xhr.send();
}

function parseCSV(csv) {
    var lines = csv.trim().split("\n");
    var rows = lines.slice(1);
    var arr = [];

    for (var i = 0; i < rows.length; i++) {
        var r = rows[i].split(";");
        arr.push({
            id: r[0],
            nome: r[1],
            marca: r[2],
            prezzo: parseFloat(r[3]),
            immagine: r[4]
        });
    }
    return arr;
}

function parseXML(xml) {
    var giochi = xml.getElementsByTagName("gioco");
    var arr = [];

    for (var i = 0; i < giochi.length; i++) {
        var g = giochi[i];
        arr.push({
            id: g.getElementsByTagName("id")[0].textContent,
            nome: g.getElementsByTagName("nome")[0].textContent,
            marca: g.getElementsByTagName("marca")[0].textContent,
            prezzo: parseFloat(g.getElementsByTagName("prezzo")[0].textContent),
            immagine: g.getElementsByTagName("immagine")[0].textContent
        });
    }
    return arr;
}

var prodotti = [];

function caricaTuttiIDati() {
    loadJSON("giochi.json", function (jsonData) {
        loadCSV("giochi.csv", function (csvData) {
            loadXML("giochi.xml", function (xmlData) {
                prodotti = jsonData.concat(csvData).concat(xmlData);

                initFiltri();
                mostraProdotti();
            });
        });
    });
}

caricaTuttiIDati();

function initFiltri() {
    var marcaSel = document.getElementById("marcaSelect");
    var marche = [];
    var temp = {};

    for (var i = 0; i < prodotti.length; i++) {
        if (!temp[prodotti[i].marca]) {
            temp[prodotti[i].marca] = true;
            marche.push(prodotti[i].marca);
        }
    }

    marcaSel.innerHTML = "<option value=''>Tutte le Marche</option>";

    for (var j = 0; j < marche.length; j++) {
        marcaSel.innerHTML += "<option>" + marche[j] + "</option>";
    }

    marcaSel.onchange = mostraProdotti;
}

function mostraProdotti() {
    var marcaSel = document.getElementById("marcaSelect").value;
    var lista = prodotti;

    if (marcaSel) {
        var filtro = [];
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].marca === marcaSel) {
                filtro.push(lista[i]);
            }
        }
        lista = filtro;
    }

    var cont = document.getElementById("prodotti");
    cont.innerHTML = "";

    for (var j = 0; j < lista.length; j++) {
        var p = lista[j];

        var div = document.createElement("div");
        div.className = "card";

        div.innerHTML =
            "<img src='" + p.immagine + "' alt='" + p.nome + "'>" +
            "<h3>" + p.nome + "</h3>" +
            "<p>" + p.marca + "</p>" +
            "<p><b>€" + p.prezzo.toFixed(2) + "</b></p>" +
            "<button onclick='aggiungiCarrello(" + p.id + ")'>Aggiungi al carrello</button>";

        cont.appendChild(div);
    }
}

function aggiungiCarrello(id) {
    var carrello = JSON.parse(localStorage.getItem("carrello")) || [];
    var prodotto = null;

    for (var i = 0; i < prodotti.length; i++) {
        if (prodotti[i].id == id) {
            prodotto = prodotti[i];
            break;
        }
    }

    if (prodotto) {
        carrello.push(prodotto);
        localStorage.setItem("carrello", JSON.stringify(carrello));
    }
}
