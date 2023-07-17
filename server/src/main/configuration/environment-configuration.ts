import 'dotenv/config'

export const {
  PORT,
  NODE_ENV: ENVIRONMENT,
  CONTROLLER_ADDRESS_ENCRYPTION_KEY,
  CAMERA_ADDRESS_ENCRYPTION_KEY
} = process.env
