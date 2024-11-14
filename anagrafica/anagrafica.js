function inserisci() {
    var nome = document.getElementById("nome").value;
    var cognome = document.getElementById("cognome").value;
    var indirizzo = document.getElementById("indirizzo").value;
    var citta = document.getElementById("citta").value;
    var email = document.getElementById("email").value;
    
    if(nome&&cognome&&indirizzo&&citta&&email){
    var table = document.getElementById("tab").getElementsByTagName('tbody')[0];

    var row = table.insertRow(-1);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    cell1.innerHTML = nome;
    cell2.innerHTML = cognome;
    cell3.innerHTML = indirizzo;
    cell4.innerHTML = citta;
    cell5.innerHTML = email;

    
    document.getElementById("form").reset();}
}



