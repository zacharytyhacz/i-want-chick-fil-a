import dotenv from 'dotenv-safe'

type Environment = {
  NODE_ENV: 'development' | 'production'
  USER_AGENT: string
  HEADLESS: boolean
}

export default (): Environment => {
  dotenv.config({
    example: './.env.example'
  })

  return {
    NODE_ENV: process.env.NODE_ENV.toLowerCase() as 'development' | 'production',
    USER_AGENT: process.env.USER_AGENT,
    HEADLESS: process.env.HEADLESS.toLowerCase() === 'true'
  }
}
