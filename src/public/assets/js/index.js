const formulario = document.querySelector('.caja form');
const btnCrear = document.getElementById('crear');
const btnEntrar = document.getElementById('entrar');
const socket = io();


btnCrear.addEventListener('click', e => {
    e.preventDefault();
    const code = Math.random().toString(30).substring(7).substr(0, 4).toUpperCase();
    let username = formulario.elements.username.value;
    if (!verificarUsername(username)) { return; }
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('salaid', code);
    redireccionar('./room/' + code);
});

btnEntrar.addEventListener('click', e => {
    e.preventDefault();
    let username = formulario.elements.username.value;
    let salaid = formulario.elements.salaid.value.toUpperCase();
    if (!verificarUsername(username) && verificarSala(salaid)) { return; }
    console.log('emit');
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('salaid', salaid);
    let url = './room/' + salaid;
    redireccionar(url);
});

function redireccionar(url) {
    window.location = url;
}

function verificarUsername(username) {
    if (!username) {
        alert('Ingresa un nombre de usuario.')
        return false;
    } else if (username.length <= 4) {
        alert('El nombre de usuario debe tener minimo 5 letras.')
        return false;
    }
    return true;
}

function verificarSala(salaid) {
    if (!salaid) {
        alert('Ingresa el codigo de la sala.')
        return false;
    } else if (salaid.length != 4) {
        alert('El codigo de la sala debe contener 4 digitos.')
        return false;
    }
    return true;
}