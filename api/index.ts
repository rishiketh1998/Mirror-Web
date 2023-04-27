import bodyParser from 'body-parser'
import express from 'express'

// This is the entry point for our API. You can split your
// handlers into multiple files if you'd like, but this isn't
// essential for a small application like this.

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// This functions a simple in-memory database for our todos.
// We can use this to store our todos in memory while we're
// developing our application. In production, we'd obviously
// use a real database to manage our data. Because this is
// just in-memory, our todos will be reset every time we
// restart our server, so don't get too attached to them :)
global.todos = [
  {
    id: '31693794-a53b-41b8-bb39-965b94e37db5',
    text: 'Create some todos...',
    completed: false,
    createdAt: '2023-04-27T16:58:40.657Z',
  },
]

// Create some routes here...

server.get('/todos', (req, res) => {
  res.json(global.todos)
})

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080')
})
