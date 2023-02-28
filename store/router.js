const url = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV : process.env.URL_API;
export default {
  service: {
    register: '/api/auth/register',
    option_pets: '/api/service/option-pets',
  },
  users: {
    list: '/api/user',
    info: '/api/user/{:id}',
    create: '/api/user',
    update: '/api/user/{:id}',
    delete: '/api/user/{:id}',
  },
  pets: {
    list: '/api/pet/{:user_id}',
    info: '/api/pet/{:user_id}/{:id}',
    create: '/api/pet',
    update: '/api/pet',
    delete: '/api/pet/{:id}',
  },
  HCP:{
    list: '/api/health-check-pet/{:pet_id}',
    info: '/api/health-check-pet/{:pet_id}/{:id}',
    create: '/api/health-check-pet',
    update: '/api/health-check-pet',
    delete: '/api/health-check-pet/{:id}',
  }
}