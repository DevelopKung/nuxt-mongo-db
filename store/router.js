const url = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV : process.env.URL_API + '/';
let base_url = process.env.NODE_ENV == 'development' ? '/api/' : process.env.GITPAGES_NAME + 'api/'
export default {
  service: {
    register: base_url + 'auth/register',
    option_pets: base_url + 'service/option-pets',
  },
  users: {
    list: url + 'user',
    info: url + 'user/{:id}',
    create: url + 'user',
    update: url + 'user/{:id}',
    delete: url + 'user/{:id}',
  },
  pets: {
    list: url + 'pet/{:user_id}',
    info: url + 'pet/{:user_id}/{:id}',
    create: url + 'pet',
    update: url + 'pet',
    delete: url + 'pet/{:id}',
  },
  HCP: {
    list: url + 'health-check-pet/{:pet_id}',
    info: url + 'health-check-pet/{:pet_id}/{:id}',
    create: url + 'health-check-pet',
    update: url + 'health-check-pet',
    delete: url + 'health-check-pet/{:id}',
  }
}