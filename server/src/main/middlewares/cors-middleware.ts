import cors from 'cors'

export const corsMiddleware = cors({
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE'
})
