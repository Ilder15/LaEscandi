// --- Definición de Productos ---
const productos = [
    {
        id: "marmolizada",
        nombre: "Cerámica Marmolizada Blanca",
        img: "img/marmol.jpg", // Asegúrate de tener esta imagen en la carpeta 'img'
        piezas: 4,
        contenido: 1.44, // m2 por caja
        descripcion: "Elegante acabado mármol, ideal para ambientes modernos y luminosos. Fácil de limpiar.",
        precioM2: 25000 // Precio por metro cuadrado
    },
    {
        id: "cemento",
        nombre: "Porcelanato Gris Cemento",
        img: "img/gris.jpg", // Asegúrate de tener esta imagen
        piezas: 3,
        contenido: 1.08,
        descripcion: "Estilo industrial y minimalista, alta resistencia al tráfico. Perfecto para interiores y exteriores.",
        precioM2: 38000
    },
    {
        id: "nogal",
        nombre: "Baldosa Efecto Madera Nogal",
        img: "img/madera.jpg", // Asegúrate de tener esta imagen
        piezas: 8,
        contenido: 1.80,
        descripcion: "Calidez de la madera con la durabilidad de la baldosa. Tonalidades oscuras y vetas realistas.",
        precioM2: 30000
    },
    {
        id: "subway",
        nombre: "Baldosa Subway Blanca Brillo",
        img: "img/subway.jpg", // ¡Añade tu propia imagen!
        piezas: 44, // Ejemplo: son más pequeñas
        contenido: 1.00, // Generalmente se venden por m2
        descripcion: "Clásico y versátil, perfecto para cocinas y baños. Acabado brillante.",
        precioM2: 22000
    },
    {
        id: "hexagonal",
        nombre: "Cerámica Hexagonal Gris Claro",
        img: "img/hexagonal.jpg", // ¡Añade tu propia imagen!
        piezas: 25,
        contenido: 0.75, // Ejemplo: cajas más pequeñas por forma
        descripcion: "Diseño moderno y geométrico para pisos o paredes. Tono suave.",
        precioM2: 35000
    }
];

// --- Función para cargar el catálogo dinámicamente ---
function cargarCatalogo() {
    const contenedorCatalogo = document.getElementById('catalogo-productos');
    contenedorCatalogo.innerHTML = ''; // Limpiar por si se carga dos veces

    productos.forEach(producto => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card-producto';
        cardDiv.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="card-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="specs">Contenido: ${producto.contenido} m²</p>
                <p class="specs">Piezas por caja: ${producto.piezas}</p>
                <p class="specs">Precio por m²: $${producto.precioM2.toLocaleString('es-CO')}</p>
            </div>
        `;
        // Al hacer clic en la tarjeta, los datos van a la calculadora
        cardDiv.onclick = () => {
            document.getElementById('piezas').value = producto.piezas;
            document.getElementById('content').value = producto.contenido;
            document.getElementById('result').innerText = `"${producto.nombre}" seleccionado. Ingresa los metros para calcular.`;
            // Opcional: Desplazarse suavemente hasta la calculadora
            document.getElementById('tileCalculatorForm').scrollIntoView({ behavior: 'smooth' });
        };
        contenedorCatalogo.appendChild(cardDiv);
    });
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

function calcularPrecio() {
    const precio = parseFloat(document.getElementById('precio').value);    // Precio por m2
    const transporte = parseFloat(document.getElementById('transporte').value); // Precio transporte por m2
    const porcentaja = parseFloat(document.getElementById('porcentaja').value); // Porcentaje de ganancia

    const precioTotalM2 = precio + transporte;
    const ganancia = (precioTotalM2 * porcentaja) / 100;
    const precioFinalM2 = precioTotalM2 + ganancia;
     document.getElementById("result").innerHTML = `Precio final por metro cuadrado: $${precioFinalM2.toLocaleString('es-CO')}.`;
}