let stringa;
let righe=[];
let tabella = [];
function leggi(input) {
    let file = input.files[0]; 

    let reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function(){
        stringa = reader.result;
        inserisci();
    }
}
function inserisci(){
    document.getElementById("titolo").innerHTML= "contenuto del file:"
    let tab = document.getElementById("tabella")
    righe=stringa.split("\n")
    for(let n = 0; n< righe.length; n++){
        tabella[n]=righe[n].split(",");
        let nuovaRiga = tab.insertRow();
        let anno = nuovaRiga.insertCell(0);
        let numero = nuovaRiga.insertCell(1);
            
           
    }   


}
