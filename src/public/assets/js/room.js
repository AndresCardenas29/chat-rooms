window.addEventListener('load', () => {
    const socket = io();

    const chat = document.querySelector('.chat');
    const loader = document.querySelector('body > section');
    const texto = document.querySelector('.redactar .texto');
    const btnEnviar = document.querySelector('.redactar button');
    const username = sessionStorage.getItem('username');
    const salaid = sessionStorage.getItem('salaid');
    const listaContactos = document.querySelector('.lista-contactos ul');


    btnEnviar.addEventListener('click', () => {
        let time = new Date().toLocaleTimeString('en-US', { hour12: true });
        socket.emit('chat:enviarMensaje', {
            username: username,
            mensaje: texto.innerText,
            time: time,
            salaid: salaid
        });
        texto.innerHTML = '';
    });

    texto.addEventListener('keypress', e => {
        if (e.key == "Enter") {
            let time = new Date().toLocaleTimeString('en-US', { hour12: true });
            socket.emit('chat:enviarMensaje', {
                username: username,
                mensaje: texto.innerText,
                time: time,
                salaid: salaid
            });
            texto.innerHTML = '';
        }
    });

    socket.emit('chat:conectado', {
        salaid: salaid,
        username: username
    });

    socket.on('chat:enviarMensaje', data => {
        if (username == data.username) {
            chat.innerHTML += `
            <div class="mensaje me">
                <div class="nombre">${data.username}</div>
                <div class="texto">
                    ${data.mensaje}
                </div>
                <div class="hora">${data.time}</div>
            </div>
            `
        } else {
            chat.innerHTML += `
            <div class="mensaje">
                <div class="nombre">${data.username}</div>
                <div class="texto">
                    ${data.mensaje}
                </div>
                <div class="hora">${data.time}</div>
            </div>
            `
        }

    });


    setTimeout(() => {
        loader.style.display = 'none';
    }, 100);


    gotoBottom();

    function gotoBottom() {
        chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }

    socket.on('chat:updateUsers', datas => {
        let html = '';
        datas.forEach(data => {
            html +=  `
                <li>${data.user}</li>
            `;
        });
        listaContactos.innerHTML = html;
    });
});