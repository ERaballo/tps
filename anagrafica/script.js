function inserisci() {
    var nome = document.getElementById("nome").value;
    var cognome = document.getElementById("cognome").value;
    var indirizzo = document.getElementById("indirizzo").value;
    var citta = document.getElementById("citta").value;
    var email = document.getElementById("email").value;
    
    if(nome&&cognome&&indirizzo&&citta&&email){
    var table = document.getElementById("tab").getElementsByTagName('tbody')[0];
    const nomi=[];
    nomi.push(nome);
    nomi.push(cognome);
    nomi.push(indirizzo);
    nomi.push(citta);
    nomi.push(email);

    var row = table.insertRow(-1);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    
    cell1.innerHTML = nomi[0];
    cell2.innerHTML = nomi[1];
    cell3.innerHTML = nomi[2];
    cell4.innerHTML = nomi[3];
    cell5.innerHTML = nomi[4];

    
    document.getElementById("form").reset();}
}
