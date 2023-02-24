const url = process.env.NODE_ENV == 'development' ? "http://localhost:8001" : process.env.URL_API;
export default {
  service: {
    register: url + '/auth/register',
  },
}