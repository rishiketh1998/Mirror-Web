import express from 'express'
import { StatusCodes } from '../types/enums/statusCodes'
import type { Todo } from '../types/interfaces/todo'

const server = express.Router()

/**
 * @description: Filter todos by completed status
 * @param todo: Todo  
 * @param completed: string 
 * @returns: boolean
 */
const filterStatus = (todo: Todo, completed: string) => {
    if(completed === 'true') return todo.completed
    else if(completed === 'false') return !todo.completed
    return true
}

/**
 * @description: Get all todos and by query parameter
 */
server.get('/', (req, res) => {
    if('completed' in req.query) {
        const { completed } = req.query
        const todos = global.todos.filter(todo => filterStatus(todo, completed as string))
        return res.status(StatusCodes.OK).json(todos)
    }
    res.status(StatusCodes.OK).json(global.todos)
})

/**
 * @description: create a new todo
 */
server.post('/', (req, res) => {
    const { text } = req.body
    global.todos.push({
        id: Math.random().toString(36).substring(2, 15),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
    })
    res.status(StatusCodes.CREATED).json(global.todos)
})

/**
 * @description: Update a todo by id
 */
server.put('/:id', (req, res) => {
    const { id } = req.params
    const { text, completed } = req.body
    const todo = global.todos.find(todo => todo.id === id)
    if (!todo) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Todo with id ${id} not found`,
        })
    }
    todo.text = text
    todo.completed = completed
    res.status(StatusCodes.OK).json(global.todos)
})

/**
 * @description: Delete a todo by id
 * @param id: string
 * @returns: Todo[]
 * @returns: StatusCodes
 * @returns: message
*/
server.delete('/:id', (req, res) => {
    const { id } = req.params
    const todoIndex = global.todos.findIndex(todo => todo.id === id)
    if (todoIndex === -1) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Todo with id ${id} not found`,
        })
    }
    global.todos.splice(todoIndex, 1)
    res.status(StatusCodes.OK).json(global.todos)
})

export default server