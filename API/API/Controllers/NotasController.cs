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
    [Authorize]
    [ApiController]
    public class NotasController : ControllerBase
    {
        private readonly INotas _notas;

        public NotasController(INotas notas)
        {
            _notas = notas;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var iduser = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
                var dados = await _notas.BuscarTodosDoUsuario(iduser);
                return Ok(dados);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var iduser = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
                var dados = await _notas.BuscarPorId(id, iduser);
                return Ok(dados);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Notes dados)
        {
            try
            {
                if (dados.Body == null || dados.Title == null)
                {
                    return this.StatusCode(StatusCodes.Status400BadRequest, "Campos obrigatórios não preenchidos.");
                }
                dados.UserId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
                _notas.Salvar(dados);
                return Ok(dados);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, Notes dados)
        {
            try
            {
                if (dados.Body == null || dados.Title == null)
                {
                    return this.StatusCode(StatusCodes.Status400BadRequest, "Campos obrigatórios não preenchidos.");
                }
                var iduser = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
                var d = await _notas.BuscarPorId(id, iduser);
                d.Title = dados.Title;
                d.Body = dados.Body;
                _notas.Salvar(d);
                return Ok(d);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var iduser = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
                var d = await _notas.BuscarPorId(id, iduser);
                _notas.Delete(d);
                return Ok(d);
            }
            catch (Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falhou: \n {e.Message}");
            }
        }
    }
}
