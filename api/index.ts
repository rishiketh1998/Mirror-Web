import bodyParser from 'body-parser'
import express from 'express'
import todo from './routes/todo'

// This is the entry point for our API. You can split your
// handlers into multiple files if you'd like, but this isn't
// essential for a small application like this.

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('/todos', todo)

// This functions a simple in-memory database for our todos.
// We can use this to store our todos in memory while we're
// developing our application. In production, we'd obviously
// use a real database to manage our data. Because this is
// just in-memory, our todos will be reset every time we
// restart our server, so don't get too attached to them :)
global.todos = [
  {
    id: '31693794-a53b-41b8-bb39-965b94e37db5',
    text: 'Get milk from the shops',
    completed: false,
    createdAt: '2023-04-27T16:58:40.657Z',
  },
  {
    id: '31693794-a53b-41b8-bb39-965b94e37db6',
    text: 'Get a pint from the pub',
    completed: false,
    createdAt: '2023-04-27T16:58:40.657Z',
  },
  {
    id: '31693794-a53b-41b8-bb39-965b94e37db7',
    text: 'Complete the todo app challenge',
    completed: true,
    createdAt: '2023-04-27T16:58:40.657Z',
  }
]

// Create some routes here...
server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080')
})
