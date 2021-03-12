
// Variables
const resultado = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minPrecio = document.querySelector('#minimo');
const maxPrecio = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const color = document.querySelector('#color');
const transmision = document.querySelector('#transmision');

const maxYear = new Date().getFullYear(); // Año actual
const minYear = maxYear - 10; // Año actual menos 10 años

// Generar un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minPrecio: '',
    maxPrecio: '',
    puertas: '',
    color: '',
    transmision: ''
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    // Muestra los autos al cargar
    mostrarAutos(autos);

    //Llena las opciones de años
    llenarSelect();
})

marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})

minPrecio.addEventListener('change', e => {
    datosBusqueda.minPrecio = parseInt(e.target.value);
    filtrarAuto();
})

maxPrecio.addEventListener('change', e => {
    datosBusqueda.maxPrecio = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

// Funciones
function mostrarAutos(autos){
    limpiarResultadoHTML();

    autos.forEach( auto => {
        // Destructuring
        const { marca, modelo, year, puertas, 
            transmision, precio, color} = auto;

        // Generar el HTML
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} - 
            ${modelo} -
            ${year} - 
            ${puertas} puertas - 
            ${transmision} - 
            ${precio} $ - 
            color: ${color}
        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    })
}

function limpiarResultadoHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect(){
    console.log('hola')
    // Recorre hacia atrás desde el año actual hasta 10 años antes
    for( let i = maxYear; i >= minYear; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

// Filtra en base a la búsqueda
function filtrarAuto(){
    // High level functions
    const resultado = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarMinPrecio)
        .filter(filtrarMaxPrecio)
        .filter(filtrarPuertas)
        .filter(filtrarColor)
        .filter(filtrarTransmision);

    if (resultado.length){
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado(){
    limpiarResultadoHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado, intenta con otras opciones';

    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    if (datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if (datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinPrecio(auto){
    if (datosBusqueda.minPrecio){
        return auto.precio >= datosBusqueda.minPrecio;
    }
    return auto;
}

function filtrarMaxPrecio(auto){
    if (datosBusqueda.maxPrecio){
        return auto.precio <= datosBusqueda.maxPrecio;
    }
    return auto;
}

function filtrarPuertas(auto){
    if (datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarColor(auto){
    if (datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}

function filtrarTransmision(auto){
    if (datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}