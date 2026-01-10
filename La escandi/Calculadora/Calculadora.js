function calculateTiles() {
    const need = parseFloat(document.getElementById("need").value);
    const content = parseFloat(document.getElementById("content").value);

    if (isNaN(need) || isNaN(content)) {
        document.getElementById("result").innerHTML = "Por favor, ingrese valores válidos.";
        return;
    }

    const tilesNeeded = need / content;

    document.getElementById("result").innerHTML = `Número de baldosas necesitadas: ${tilesNeeded}`;
}

function calcularExacto() {
    const need = parseFloat(document.getElementById('need').value);    // Ejemplo: 10
    const content = parseFloat(document.getElementById('content').value); // Ejemplo: 1.44
    const piezasPorCaja = parseInt(document.getElementById('piezas').value); // Ejemplo: 4

    if (need > 0 && content > 0) {
        // 1. Calcular cuántos metros rinde cada baldosa suelta
        const m2PorPieza = content / piezasPorCaja; 

        // 2. Calcular cuántas piezas totales se necesitan para cubrir los metros
        // Math.ceil asegura que si falta un poquito, se agregue una pieza más
        const piezasTotales = Math.ceil(need / m2PorPieza);

        // 3. Calcular cuántas cajas completas salen de esas piezas
        const cajas = Math.floor(piezasTotales / piezasPorCaja);

        // 4. Calcular cuántas piezas sueltas quedan
        const piezasSueltas = piezasTotales % piezasPorCaja;
         document.getElementById("result").innerHTML = `Número de baldosas necesitadas: ${cajas} cajas y ${piezasSueltas} baldosas.`;
    }

}