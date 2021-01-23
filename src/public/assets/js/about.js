const txtSalaId = document.querySelector('.txtSalaId');
const txtUsername = document.querySelector('.txtUsername');
const txtSalaIdBusqueda = document.querySelector('.txtBuscar');
const btnBuscar = document.querySelector('.btnBuscar');
const btnAgregarDatos = document.querySelector('.btnAgregarDatos');
const btnListarUser = document.querySelector('.btnListarUser');
const btnListarSala = document.querySelector('.btnListarSala');
const listaUsuarios = document.querySelector('.lista-salas ul');
const tituloListaUsuarios = document.querySelector('.lista-salas .titulo h3');


let salas = [
    {
        salaid: '26SA',
        users: ['andres', 'carlos', 'pedro']
    },
    {
        salaid: 'XX12',
        users: ['Angelica', 'Lista', 'Laura']
    }
];

btnAgregarDatos.addEventListener('click', () => {
    let getUserName = txtUsername.value;
    let getSalaId = txtSalaId.value;
    let estado = false;

    salas.forEach(sala => {
        if (sala.salaid == getSalaId) {
            sala.users.push(getUserName);
            estado = true;
        }
    });
    if (!estado) {
        if (getSalaId == '') {
            salas.push({
                salaid: Math.random().toString(30).substring(7).substr(0, 4).toUpperCase(),
                users: new Array(getUserName)
            });
        } else {
            salas.push({
                salaid: getSalaId,
                users: new Array(getUserName)
            });
        }
    }

    txtUsername.value = '';
    txtSalaId.value = '';

});

btnListarUser.addEventListener('click', () => {
    tituloListaUsuarios.innerHTML = 'USUARIOS';
    listaUsuarios.innerHTML = '';
    let html = '';
    salas.forEach(sala => {
        html += `
            <li>${sala.salaid}
                <ul>
        `;
        sala.users.forEach(user => {
            html += `
                <li>${user}</li>
            `
        });

        html += `
                </ul>
            </li>
        `
    });
    listaUsuarios.innerHTML = html;
});

btnListarSala.addEventListener('click', () => {
    tituloListaUsuarios.innerHTML = 'SALAS';
    let html = '';
    listaUsuarios.innerHTML = '';
    salas.forEach(sala => {
        html += `
            <li>${sala.salaid}</li>
        `;
    });
    listaUsuarios.innerHTML = html;
});

btnBuscar.addEventListener('click', () => {
    let getSalaId = txtSalaIdBusqueda.value;
    let html = '';
    let estado = false;
    salas.forEach(sala => {
        if (sala.salaid == getSalaId) {
            sala.users.forEach(user => {
                html += `
                    <li>${user}</li>
                `;
            });
            listaUsuarios.innerHTML = html;
            estado = true;
        }
    });
});

