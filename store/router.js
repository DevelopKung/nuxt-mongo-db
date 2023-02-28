const url = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV : process.env.URL_API;
let base_url = process.env.NODE_ENV == 'development' ? '/' : process.env.GITPAGES_NAME + 'api/'
export default {
  service: {
    register: base_url + 'api/auth/register',
    option_pets: base_url + 'api/service/option-pets',
  },
  users: {
    list: base_url + 'api/user',
    info: base_url + 'api/user/{:id}',
    create: base_url + 'api/user',
    update: base_url + 'api/user/{:id}',
    delete: base_url + 'api/user/{:id}',
  },
  pets: {
    list: base_url + 'api/pet/{:user_id}',
    info: base_url + 'api/pet/{:user_id}/{:id}',
    create: base_url + 'api/pet',
    update: base_url + 'api/pet',
    delete: base_url + 'api/pet/{:id}',
  },
  HCP: {
    list: base_url + 'api/health-check-pet/{:pet_id}',
    info: base_url + 'api/health-check-pet/{:pet_id}/{:id}',
    create: base_url + 'api/health-check-pet',
    update: base_url + 'api/health-check-pet',
    delete: base_url + 'api/health-check-pet/{:id}',
  }
}