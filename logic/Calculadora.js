// 1. INICIALIZACIÓN DE SWIPER (Solo si el elemento existe en la página)
if (document.querySelector('.mySwiper')) {
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
    });
}

// 2. FUNCIÓN CALCULAR BALDOSAS
function calcularExacto() {
    const need = parseFloat(document.getElementById('need').value);      // Metros que el cliente necesita
    const content = parseFloat(document.getElementById('content').value); // Metros que trae cada caja
    const piezasPorCaja = parseInt(document.getElementById('piezas').value); // Piezas que trae cada caja

    if (need && content && piezasPorCaja) {
        // 1. Calculamos el área de una sola baldosa individual
        const areaPorPieza = content / piezasPorCaja;

        // 2. Calculamos cuántas piezas individuales se necesitan en total para cubrir los metros
        // Usamos Math.ceil para redondear hacia arriba y asegurar que no falte material
        const totalPiezasNecesarias = Math.ceil(need / areaPorPieza);

        // 3. Calculamos cuántas cajas completas son
        const cajasCompletas = Math.floor(totalPiezasNecesarias / piezasPorCaja);

        // 4. Calculamos cuántas piezas sueltas quedan (el residuo)
        const piezasSueltas = totalPiezasNecesarias % piezasPorCaja;

        // 5. Mostramos el resultado como en tu imagen
        let mensaje = `Número de baldosas necesitadas: ${cajasCompletas} cajas`;
        
        if (piezasSueltas > 0) {
            mensaje += ` y ${piezasSueltas} baldosas.`;
        } else {
            mensaje += `.`;
        }

        document.getElementById('result').innerHTML = mensaje;

    } else {
        alert("Por favor, llena todos los campos");
    }
}

// 3. FUNCIÓN CALCULAR PRECIO
function calcularPrecio() {
    const precio = parseFloat(document.getElementById('precio').value);
    const transporte = parseFloat(document.getElementById('transporte').value);
    const porcentaje = parseFloat(document.getElementById('porcentaja').value);

    if (precio && transporte && porcentaje) {
        const costoTotal = precio + transporte;
        const ganancia = costoTotal * (porcentaje / 100);
        const precioVenta = Math.ceil(costoTotal + ganancia);

        document.getElementById('result').innerHTML = `
            Precio sugerido de venta:<br>
            <span style="font-size: 1.5rem; color: #063212;">$${precioVenta.toLocaleString()}</span>
        `;
    } else {
        alert("Por favor llena todos los campos");
    }
}