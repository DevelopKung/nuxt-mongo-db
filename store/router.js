const url = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV : process.env.URL_API;
export default {
  service: {
    register: url + '/auth/register',
  },
}