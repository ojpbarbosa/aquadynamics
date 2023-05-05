import c from 'cors'

export const cors = c({
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE'
})
