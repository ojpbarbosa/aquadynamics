import c from 'cors'
// import { NODE_ENVIRONMENT } from '@main/configuration/environment-configuration'

export const cors = c({
  // origin: (origin, callback) => {
  //   callback(
  //     null,
  //     origin === 'https://soe.cotuca.unicamp.br' ||
  //       origin === 'https://painel.soe.cotuca.unicamp.br' ||
  //       !(NODE_ENVIRONMENT === 'production' && origin?.startsWith('http://localhost')) ||
  //       !(NODE_ENVIRONMENT === 'production' && !origin)
  //   )
  // },
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE'
})
