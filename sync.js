const Rsync = require('rsync')

// Updates environment variables
require('./dotenv')

// Sync secrets
sync('./secrets', '/var/www/crud-demo')

// ========================
// Functions
// ========================
/**
 * Syncs files into server
 * @param {String} source
 * @param {String} destination
 * @param {Boolean} dryRun
 */
function sync (source, destination, dryRun = false) {
  const rsync = new Rsync()
    .shell('ssh')
    .set('stats')
    .flags('avz')
  // .flags('n') // For dry run.
    .source(source)
    .destination(`${process.env.SSH_USER}@${process.env.SSH_HOST}:${destination}`)

  if (dryRun) rsync.flags('n')

  rsync.output(
    function (data) {
      // do things like parse progress
      const string = Buffer.from(data).toString()
      console.log(string)
    }, function (data) {
      // do things like parse error output
      console.log(data)
    }
  )

  // Execute the command
  rsync.execute(function (error, code, cmd) {
    if (error) console.error(error)
    console.log(cmd)
  })
}
