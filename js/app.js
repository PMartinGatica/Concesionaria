/* -------------------------------------------------------------------------- */
/*                                  variables                                 */
/* -------------------------------------------------------------------------- */
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda

const datosBusqueda = {
    marca :'',
    year :'',
    minimo :'',
    maximo :'',
    puertas :'',
    transmision :'',
    color :'',
}

// console.log(max);
// console.log(min);

/* -------------------------------------------------------------------------- */
/*                                   eventos                                  */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos); // muestras los autos al cargar

    // llena las opciones de años

    llenarSelect();
})


//EvenListener para lso select de busqueda

marca.addEventListener('change',e=>{
    datosBusqueda.marca = e.target.value;
    //console.log(datosBusqueda);
    filtrarAuto();
    
    
})
year.addEventListener('change',e=>{
    datosBusqueda.year =parseInt( e.target.value);
    //console.log(datosBusqueda);
    filtrarAuto();

})
minimo.addEventListener('change',e=>{
    datosBusqueda.minimo = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto()
    
})
maximo.addEventListener('change',e=>{
    datosBusqueda.maximo = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto()
})
puertas.addEventListener('change',e=>{
    datosBusqueda.puertas =parseInt( e.target.value);
    console.log(datosBusqueda);
    filtrarAuto()
    
})
transmision.addEventListener('change',e=>{
    datosBusqueda.transmision = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto()
    
})
color.addEventListener('change',e=>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto()
    
})

//console.log(datosBusqueda);

/* -------------------------------------------------------------------------- */
/*                                  funciones                                 */
/* -------------------------------------------------------------------------- */

function mostrarAutos(autos) {

    limpiarHTML();//Elimina el HTML PREVIO

    autos.forEach(auto => {
        const {marca,modelo,year,puertas,transmision,precio,color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca}
        ${modelo}
        ${year}-
        ${puertas} Puertas-
        Transmision: ${transmision} -
        Precio : ${precio} -
        Color : ${color}
        `;

        //insertar en el HTML
        resultado.appendChild(autoHTML)
    });
}

//Limpiar HTML

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select

function llenarSelect() {
    console.log('llenando select...');

    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);//Agrega opciones a year        
    }
    
}

//Funcion que filtra en base a la busqueda

function filtrarAuto() {
    const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuerta)
    .filter(filtrarTransmision)
    .filter(filtrarColor)

    console.log(resultado)
      
    if (resultado.length) {
        mostrarAutos(resultado)
    } else{
        noResultado();
    }    
}

function noResultado() {

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros terminos de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
    
}

function filtrarYear(auto) {
    if (datosBusqueda.year) {
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
    
}
function filtrarMinimo (auto) {
    if (datosBusqueda.minimo) {
        return auto.precio >= (datosBusqueda.minimo);
    }
    return auto;
    
}
function filtrarMaximo (auto) {
    if (datosBusqueda.maximo) {
        return auto.precio <= (datosBusqueda.maximo);
    }
    return auto;
    
}
function filtrarPuerta(auto) {
    if (datosBusqueda.puertas) {
        return auto.puertas === (datosBusqueda.puertas);
    }
    return auto;
    
}
function filtrarTransmision(auto) {
    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
    
}
function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
    
}