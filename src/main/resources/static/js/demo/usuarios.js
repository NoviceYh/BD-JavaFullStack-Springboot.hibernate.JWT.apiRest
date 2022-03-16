// Call the dataTables jQuery plugin
$(document).ready(function() {

cargarUsuarios();

  $('#usuarios').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario(){
  document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

async function cargarUsuarios(){
//se llama al controlador api/usuarios
const request = await fetch('api/usuarios', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
});
const usuarios = await request.json();
//define una variable para guardar la tabla, todas las filas y columnas
let listadoHtml = '';


for (let usuario of usuarios) {
  //define una variable botonEliminar donde detalla el onclick donde llama a la funcion eliminarUsuario
  let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
  //Esto lo hacemos para que no aparezca un "null" en la columna de telefonos si no hay datos
  let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono;
  //guarda una fila de la base de datos
  let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido + 
  '</td><td>' + usuario.email + '</td><td>' + telefonoTexto + 
  '</td><td>' + botonEliminar + '</td></tr>';
  //va acumulando las filas una por una para luego mostrarlas como tabla
  listadoHtml += usuarioHtml;

}
//define que lo que esta adentro del tbody va a ser igual a listadoHtml que en este caso es la tabla
document.querySelector('#usuarios tbody').outerHTML = listadoHtml;

}

async function eliminarUsuario(id){
  //consulta si desea eliminar al usuario al apretar el icono de eliminar
  if (!confirm('¿Desea eliminar el usuario?')) {
    return;
  }
  //si la respuesta es positiva se llama al controlador api/usuarios/{id} method Delete
  const request = await fetch('api/usuarios/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token //enviamos el token para la request
    }
  });
  location.reload(); //esto provoca que se recargue la pagina automaticamente
}