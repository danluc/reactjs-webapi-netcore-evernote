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
    public class NotasRepository : INotas
    {
        private readonly NotesContext _notesContext;

        public NotasRepository(NotesContext notesContext)
        {
            _notesContext = notesContext;
        }

        public async Task<Notes> BuscarPorId(string ID, int user)
        {
            IQueryable<Notes> q = _notesContext.Notes.Where(c => c.Id == ID && c.UserId == user);
            return await q.FirstOrDefaultAsync();
        }

        public async Task<Notes[]> BuscarTodosDoUsuario(int user)
        {
            IQueryable<Notes> q = _notesContext.Notes.Where(c => c.UserId == user);
            return await q.ToArrayAsync();
        }

        public bool Delete(Notes notes)
        {
                _notesContext.Remove(notes);
                _notesContext.SaveChanges();
            return true;
        }

        public bool Salvar(Notes notes)
        {
            if (notes.Id != null)
            {
                _notesContext.Update(notes);
            }
            else
            {
                _notesContext.Add(notes);
            }
            _notesContext.SaveChanges();
            return true;
        }
    }
}
