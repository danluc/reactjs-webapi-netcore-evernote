using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class UsersRepository : IUsuarios
    {
        private readonly NotesContext _notesContext;

        public UsersRepository(NotesContext notesContext)
        {
            _notesContext = notesContext;
        }

        public async Task<Users> BuscarPorId(int id)
        {
            IQueryable<Users> q = _notesContext.Users.Where(c => c.Id == id);
            return await q.FirstOrDefaultAsync();
        }

        public async Task<Users> BuscarPorEmail(string email)
        {
            IQueryable<Users> q = _notesContext.Users.Where(c => c.Email == email);
            return await q.FirstOrDefaultAsync();
        }

        public async Task<Users> Login(string email, string pass)
        {
            IQueryable<Users> q = _notesContext.Users.Where(c => c.Email == email && c.Password == pass);
            return await q.FirstOrDefaultAsync();
        }

        public bool Salvar(Users dados)
        {
            if(dados.Id > 0)
            {
                _notesContext.Update(dados);
            }
            else
            {
                _notesContext.Add(dados);
            }
            _notesContext.SaveChanges();
            return true;
        }
    }
}
