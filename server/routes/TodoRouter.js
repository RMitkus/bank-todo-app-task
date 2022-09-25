import express from 'express'
import { asyncWrap } from '../common/common.js'
import TodoController from '../controllers/TodoController.js'

const router = express.Router()
const todoController = TodoController()

router.get('/', asyncWrap(todoController.getAllTodos))

router.post('/', asyncWrap(todoController.addNewTodo))

router.patch('/status/:id', asyncWrap(todoController.updateTodo))

export default router