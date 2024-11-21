function inserisci() {
    var nome = document.getElementById("nome").value;
    var cognome = document.getElementById("cognome").value;
    var indirizzo = document.getElementById("indirizzo").value;
    var citta = document.getElementById("citta").value;
    var email = document.getElementById("email").value;

    if (nome && cognome && indirizzo && citta && email) {
        var nuovoDato = nome + "," + cognome + "," + indirizzo + "," + citta + "," + email;

        var datiSalvati = localStorage.getItem("datiUtenti") || "";
        if (datiSalvati) {
            datiSalvati += ";" + nuovoDato; 
        } else {
            datiSalvati = nuovoDato;
        }

        localStorage.setItem("datiUtenti", datiSalvati);

        document.getElementById("form").reset();
    }
    window.location.href = "tabellaA2.html";
}

