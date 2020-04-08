const fs = require('fs')
const dotenv = require('dotenv')

/**
 * Overrides existing env with variables from config Need this because:
 * 1. pm2 cluster mode stores previous env variables
 * 2. dotenv doesn't overwrite env variables automatically
 * @see https://www.npmjs.com/package/dotenv
 * @param {String} pathToConfig
 */
function updateEnv (pathToConfig) {
  const envConfig = dotenv.parse(fs.readFileSync(pathToConfig))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

// Update Environment variables
updateEnv('./secrets/variables.env')
