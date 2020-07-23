import Api from "./api";

const UserService = {
  index: () => Api.get("usuarios", {
    headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
  }),

  register: (params) => Api.post("usuarios", params),

  update: async (id, params) => {
    const res =  await Api.put('usuarios/' + id, params, {
      headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
    })
    console.log(res)
    localStorage.setItem('user', JSON.stringify(res.data))
  },

  login: async (params) => {
    const res = await Api.post("auth", params);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
  },

  logout: () => {
    localStorage.removeItem('user', null);
    localStorage.removeItem('token', null);
  }
};

export default UserService;
