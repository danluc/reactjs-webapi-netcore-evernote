using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarios _usuarios;

        public UsuariosController(IUsuarios usuarios)
        {
            _usuarios = usuarios;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            try
            {
                var iduser = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
                var usu = await _usuarios.BuscarPorId(iduser);
                return Ok(usu);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(Users dados)
        {
            try
            {
                if (dados.Email == null || dados.Password == null || dados.Name == null)
                {
                    return this.StatusCode(StatusCodes.Status400BadRequest, "Campos obrigatórios não preenchidos.");
                }
                _usuarios.Salvar(dados);
                return Ok(dados);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, Users dados)
        {
            try
            {
                if (dados.Email == null || dados.Name == null)
                {
                    return this.StatusCode(StatusCodes.Status400BadRequest, "Campos obrigatórios não preenchidos.");
                }
                var usu = await _usuarios.BuscarPorId(id);
                usu.Name = dados.Name == null ? usu.Name : dados.Name;
                usu.Password = dados.Password == null ? usu.Password : dados.Password;
                _usuarios.Salvar(usu);
                return Ok(usu);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }
    }
}
