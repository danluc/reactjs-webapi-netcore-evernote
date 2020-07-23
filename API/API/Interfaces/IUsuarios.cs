using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUsuarios
    {
        Task<Users> BuscarPorEmail(string email);
        Task<Users> BuscarPorId(int id);
        Task<Users> Login(string email, string pass);
        bool Salvar(Users dados);
    }
}
