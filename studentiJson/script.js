var studenti = [];

// Funzione per caricare il file JSON con XMLHttpRequest
function caricaStudenti() {
  var req= new XMLHttpRequest();
  req.open("GET", "studenti.json", true);
  req.send();
  req.onload= function() {
      studenti= JSON.parse(req.responseText);
      mostraTabella(studenti);
  };
}
  

// Filtra per lettera iniziale del cognome
function filtraPerLettera() {
  var lettera= document.getElementById("letteraInput").value.toUpperCase();
  var filtrati= [];

  for (var i=0; i<studenti.length; i++) {
    var cognome= studenti[i].cognome.toUpperCase();
    if (cognome.startsWith(lettera)) {
      filtrati.push(studenti[i]);
    }
  }

  mostraTabella(filtrati);
}

// Mostra solo i maggiorenni
function mostraMaggiorenni() {
  var maggiorenni = [];

  for (var i=0; i<studenti.length; i++) {
    if (studenti[i].eta>= 18) {
      maggiorenni.push(studenti[i]);
    }
  }

  mostraTabella(maggiorenni);
}

// Mostra i dati nella tabella
function mostraTabella(lista) {
  var corpo = document.querySelector("#tabellaStudenti tbody");
  corpo.innerHTML = "";

  for (var i=0; i<lista.length; i++) {
    var riga = "<tr>"+
      "<td>"+lista[i].nome+"</td>"+
      "<td>"+lista[i].cognome+"</td>" +
      "<td>"+lista[i].eta+"</td>" +
      "</tr>";
    corpo.innerHTML+= riga;
  }
}

// Esegue il caricamento dei dati appena la pagina è pronta
window.onload= function() {
  caricaStudenti();

};
