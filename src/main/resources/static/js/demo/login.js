$(document).ready(function() {
    //on ready
});
    
async function iniciarSesion(){
    //Creamos esta variable para guardar los atributos del objeto Usuario
    let datos = {};
    //capturamos los datos del html de los campos email y password
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;

    
    //enviamos los datos al controlador api/login con el metodo POST para iniciar sesion
    const request = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos) //con esta funcion, convertimos los datos en un json
    });

const respuesta = await request.text();
if (respuesta != 'FAIL') {
  //Guardamos el token JWT
  localStorage.token = respuesta;
  localStorage.email = datos.email;
  //Ok es el String del controlador. El codigo de abajo redirije a un html
  window.location.href = 'usuarios.html';
}else{
  alert('Las credenciales son incorrectas.');
}
    
}