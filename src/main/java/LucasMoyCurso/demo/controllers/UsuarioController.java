
package LucasMoyCurso.demo.controllers;

import LucasMoyCurso.demo.dao.UsuarioDao;
import LucasMoyCurso.demo.dao.UsuarioDaoImp;
import LucasMoyCurso.demo.models.Usuario;
import LucasMoyCurso.demo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
    
    @Autowired
    private UsuarioDao usuarioDao;
    
    @Autowired
    private JWTUtil jwtUtil;
    
    @RequestMapping(value = "/")
    public String index(){
       return "index";
    }
    
    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(@PathVariable Long id){
        Usuario usuario = new Usuario();
        
        usuario.setId(id);
        usuario.setNombre("Alejandro");
        usuario.setApellido("Aguirre");
        usuario.setEmail("aguirreee21@gmail.com");
        usuario.setTelefono("15616298");
        
        return usuario;
    }
    
    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token){ //recibe el token de usuarios.js
        
        if (!validarToken(token)) { return null;}
        
        return usuarioDao.getUsuarios();
    }
    
    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario){ //RequestBody convierte el json a un usuario
        
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        
        usuario.setPassword(hash);
        
        usuarioDao.registrar(usuario);
    }
    
    @RequestMapping(value = "api/editar")
    public Usuario editar(){
        Usuario usuario = new Usuario();
        
        usuario.setNombre("Alejandro");
        usuario.setApellido("Aguirre");
        usuario.setEmail("aguirreee21@gmail.com");
        usuario.setTelefono("15616298");
        
        return usuario;
    }
    
    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, 
            @PathVariable Long id){
        
        if (!validarToken(token)) { return;}
        usuarioDao.eliminar(id);
    }
    
    private boolean validarToken(String token){
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId!=null;
    }
    
}
