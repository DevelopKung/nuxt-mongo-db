const url = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV : process.env.URL_API + '/';
let base_url = process.env.NODE_ENV == 'development' ? '/api/' : process.env.GITPAGES_NAME + 'api/'
export default {
  service: {
    register: base_url + 'auth/register',
    option_pets: base_url + 'service/option-pets',
  },
  users: {
    list: base_url + 'user',
    info: base_url + 'user/{:id}',
    create: base_url + 'user',
    update: base_url + 'user/{:id}',
    delete: base_url + 'user/{:id}',
  },
  pets: {
    list: base_url + 'pet/{:user_id}',
    info: base_url + 'pet/{:user_id}/{:id}',
    create: base_url + 'pet',
    update: base_url + 'pet',
    delete: base_url + 'pet/{:id}',
  },
  HCP: {
    list: base_url + 'health-check-pet/{:pet_id}',
    info: base_url + 'health-check-pet/{:pet_id}/{:id}',
    create: base_url + 'health-check-pet',
    update: base_url + 'health-check-pet',
    delete: base_url + 'health-check-pet/{:id}',
  }
}