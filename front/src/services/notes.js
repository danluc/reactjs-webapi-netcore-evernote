import Api from "./api";

const NotesServices = {

    index: () => Api.get('/notas', {
        headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
    }),
    create: () => Api.post('/notas', { 'title': 'Nova nota', 'body': 'Nova nota...' }, {
        headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
    }),
    delete: (id) => Api.delete('/notas/'+id, {
        headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
    }),
    update: (id, params) => Api.put('/notas/'+id, params, {
        headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
    })

}

export default NotesServices