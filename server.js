const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/


// Replace process.env.DB_URL with your actual connection string
const connectionString = "mongodb+srv://sachiko95:lucky7@cluster0.ilksw.mongodb.net/blog-engine?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('blog')
    const postsCollection = db.collection('posts')

    // ========================
    // Middlewares
    // ========================
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    // ========================
    // Routes
    // ========================
    app.get('/', (req, res) => {
      db.collection('posts').find().toArray()
        .then(posts => {
          res.render('index.ejs', { posts: posts })
        })
        .catch(/* ... */)
    })

    app.post('/posts', (req, res) => {
      postsCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/posts', (req, res) => {
      postsCollection.findOneAndUpdate(
        { name: req.body.name },
        {
          $set: {
            name: req.body.name,
            post: req.body.post
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/posts', (req, res) => {
      postsCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No post to delete')
          }
          res.json('Deleted Darth Vadar\'s post')
        })
        .catch(error => console.error(error))
    })

    // ========================
    // Listen
    // ========================
    const isProduction = process.env.NODE_ENV === 'production'
    const port = isProduction ? 7500 : 3001
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })
  .catch(console.error)
