using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface INotas
    {
        Task<Notes> BuscarPorId(string ID, int user);
        Task<Notes[]> BuscarTodosDoUsuario(int user);
        bool Salvar(Notes notes);
        bool Delete(Notes notes);
    }
}
