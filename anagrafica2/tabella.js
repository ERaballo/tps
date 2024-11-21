var datiUtenti = localStorage.getItem("datiUtenti");

if (datiUtenti) {
    var tabella = document.getElementById("tabella").getElementsByTagName("tbody")[0];
    var righe = datiUtenti.split(";");

    righe.forEach(function (riga) {
        var campi = riga.split(",");

        var row = tabella.insertRow();

        var cellaNome = row.insertCell(0);
        var cellaCognome = row.insertCell(1);
        var cellaIndirizzo = row.insertCell(2);
        var cellaCitta = row.insertCell(3);
        var cellaEmail = row.insertCell(4);

        cellaNome.innerHTML = campi[0];
        cellaCognome.innerHTML = campi[1];
        cellaIndirizzo.innerHTML = campi[2];
        cellaCitta.innerHTML = campi[3];
        cellaEmail.innerHTML = campi[4];
    });
} 

function svuotaTabella() {
    
    localStorage.removeItem("datiUtenti");

    var corpoTabella = document.getElementById("tabella").getElementsByTagName("tbody")[0];
    corpoTabella.innerHTML = "";

}

function indietro(){
    window.location.href = "anagrafica2.html";
}