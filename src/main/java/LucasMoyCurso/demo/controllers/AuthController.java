
package LucasMoyCurso.demo.controllers;

import LucasMoyCurso.demo.dao.UsuarioDao;
import LucasMoyCurso.demo.models.Usuario;
import LucasMoyCurso.demo.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    
    @Autowired
    private UsuarioDao usuarioDao;
    
    @Autowired
    private JWTUtil jwtUtil;
    
    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){ //RequestBody convierte el json a un usuario
        
        Usuario usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        
        if ( usuarioLogueado != null) {
            
            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());
            
            return tokenJwt;
        }else{
            return "FAIL";
        }
       
    }
    
}
