using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsuarios _usuarios;
        private readonly IConfiguration _config;

        public AuthController(IUsuarios usuarios, IConfiguration config)
        {
            _usuarios = usuarios;
            _config = config;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(Users dados)
        {
            try
            {
                var usuario = await _usuarios.Login(dados.Email, dados.Password);
                if(usuario != null)
                {
                    return Ok(new
                    {
                        token = GenerateJWToken(usuario.Name, usuario.Id).Result,
                        user = usuario
                    });
                }
                return this.StatusCode(StatusCodes.Status401Unauthorized, "Usuário ou senha invalidas.");
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }


        private async Task<string> GenerateJWToken(string nome, int id)
        {
            // Permissões
            var claims = new List<Claim> {
                    new Claim (ClaimTypes.NameIdentifier, id.ToString ()),
                    new Claim (ClaimTypes.Name, nome),
                };

            // Chave
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value));

            // Tipo de Criptografia
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Montando Token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            // Manipulando o Token
            var tokenHandler = new JwtSecurityTokenHandler();

            // Criando token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Retornando o Token
            return tokenHandler.WriteToken(token);
        }
    }
}
