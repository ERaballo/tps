function aggiungi(valore) {
    document.getElementById("schermo").value += valore;
}

function cancella() {
    document.getElementById("schermo").value = "";
}

function risultato() {
    let schermo = document.getElementById("schermo");
    let espressione = schermo.value;

    if (espressione.includes('+')) {
        let numeri = espressione.split('+');
        schermo.value = parseFloat(numeri[0]) + parseFloat(numeri[1]);
    } else if (espressione.includes('-')) {
        let numeri = espressione.split('-');
        schermo.value = parseFloat(numeri[0]) - parseFloat(numeri[1]);
    } else if (espressione.includes('*')) {
        let numeri = espressione.split('*');
        schermo.value = parseFloat(numeri[0]) * parseFloat(numeri[1]);
    } else if (espressione.includes('/')) {
        let numeri = espressione.split('/');
        schermo.value = parseFloat(numeri[0]) / parseFloat(numeri[1]);
    }
}
;
