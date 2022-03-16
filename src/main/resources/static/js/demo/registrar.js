$(document).ready(function() {
    //on ready
});
    
async function registrarUsuario(){
    //Creamos esta variable para guardar los atributos del objeto Usuario
    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value; //capturamos los datos de los campos 
    datos.apellido = document.getElementById('txtApellido').value;//del html
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;

    let repetirPassword = document.getElementById('txtRepetirPassword').value;
    //comparamos las contraseñas, si no son iguales, una alerta se dispara y termina la funcion
    if (repetirPassword != datos.password) {
        alert('Las contraseñas no coinciden');
        return;
    }
    //enviamos los datos al controlador api/usuarios con el metodo POST ya que creamos un usuario
    const request = await fetch('api/usuarios', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos) //con esta funcion, convertimos los datos en un json
    });
    //una alerta para mostrar que el registro fue exitoso
    alert('La cuenta fue creada con éxito!');
    window.location.href = 'login.html';


}