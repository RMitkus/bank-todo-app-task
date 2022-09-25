import createError from 'http-errors'
import db from "../database/firestore.js";
import { toAllTodos } from "../mappers/TodoMapper.js";

export default function() {
    const controller = {}

    controller.getAllTodos = async (req, res) => {
        const snapshot = await db.collection('todos').get();
        const collection = toAllTodos(snapshot)
        res.json(collection);
    }

    controller.addNewTodo = async (req, res) => {
        const { title } = req.body
        await db.collection('todos').doc().set({
            title,
            done: false
        });
        res.json()
    }

    controller.updateTodo = async (req, res) => {
        const { id } = req.params
        const todo = (await db
                            .collection('todos')
                            .doc(id)
                            .get())

        if(!todo.exists) {
            throw createError(404, 'Todo not found')
        }

        await db
            .collection('todos')
            .doc(id)
            .set({
                done: !todo.data().done
            },
                { merge: true }
            );

        res.json()
    }

    return controller
}