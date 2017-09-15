package br.com.fabricadeprogramador.ws.controller;

import java.rmi.ServerException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.fabricadeprogramador.ws.model.Usuario;
import br.com.fabricadeprogramador.ws.service.UsuarioService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class LoginController {

	@Autowired
	private UsuarioService usuarioService;
	
	@RequestMapping(value="/autenticar", consumes=MediaType.APPLICATION_JSON_VALUE, method=RequestMethod.POST)
	public LoginResponse autenticar(@RequestBody Usuario usuario) throws ServerException {
		
		if(usuario.getNome() == null || usuario.getSenha() == null) {
			throw new ServerException("Nome e Senha obrigattória");
		}	
		//consultar banco para autenticar se usuario exixte(banco)
		Usuario usuAutenticado = usuarioService.buscarPorNome(usuario.getNome());
		if(usuAutenticado == null) {
			throw new ServerException("Usuario não encontrado.");
		}
		if(!usuAutenticado.getSenha().equals(usuario.getSenha())) {
			throw new ServerException("Usuario ou Senha inválido");
		}
		//TOKEN
		String token = Jwts.builder()
				.setSubject(usuAutenticado.getNome())
				.signWith(SignatureAlgorithm.HS512, "banana")
				.setExpiration(new Date(System.currentTimeMillis() + 2 * 60 * 1000))//dois minutos
				.compact();
		
		return new LoginResponse(token);
	}
	
	private class LoginResponse{
		
		public String token;
		
		public LoginResponse(String token) {
			this.token = token;
		}
		
		
	}
}
