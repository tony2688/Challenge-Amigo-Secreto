//Variables
let participantes = []; // Array principal para almacenar nombres

function agregarAmigo() {
    // Obtener elemento del DOM
    const input = document.getElementById('amigo');
    
    // Validar entrada
    const nombre = input.value.trim();
    
    //Condicionales
    if (!nombre) {
        alert('Por favor ingresa un nombre válido');
        return;
    }
    
    if (participantes.includes(nombre)) {
        alert('Este nombre ya está en la lista');
        return;
    }
    
    //Array operations 
    participantes.push(nombre);
    actualizarListaAmigos();
    input.value = '';
}

function actualizarListaAmigos() {
    //DOM 
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpiar lista
    
    participantes.forEach(participante => {
        const elemento = document.createElement('li');
        elemento.textContent = participante;
        lista.appendChild(elemento);
    });
}

function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generarAsignacionesValidas() {
    //Validación con condicional 
    if (participantes.length < 2) {
        alert('Necesitas al menos 2 participantes');
        return null;
    }
    
    let asignaciones = [...participantes]; // Clonar array
    let intentos = 0;
    const MAX_INTENTOS = 1000;

   
    //Loop controlado por condición (do-while) 
    do {
        mezclarArray(asignaciones);
        intentos++;
        
        //Validación con método de array
        if (intentos > MAX_INTENTOS) {
            alert('Error: No se pudieron generar asignaciones válidas');
            return null;
        }
    } while (asignaciones.some((nombre, index) => nombre === participantes[index]));
    
    return asignaciones;
}

function mostrarResultado(asignaciones) {
    
    //Manipulación del DOM + Loop 
    const contenedorResultados = document.getElementById('resultado');
    contenedorResultados.innerHTML = '';
    
    participantes.forEach((participante, index) => {
        const elemento = document.createElement('li');
        elemento.textContent = `${participante} ➔ ${asignaciones[index]}`;
        contenedorResultados.appendChild(elemento);
    });
}

function sortearAmigo() {
   //Función con retorno condicional 
    const asignaciones = generarAsignacionesValidas();
    
    if (asignaciones) {
        mostrarResultado(asignaciones);
    }
}