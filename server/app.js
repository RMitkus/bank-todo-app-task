import "dotenv/config.js";
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import todoRouter from './routes/TodoRouter.js'
import { errorHandler, notFound } from "./common/common.js";

const app = express()


app.use(cors({origin: 'http://localhost:3000'}))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/todo', todoRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Rainbows and sparkles on port:${PORT}`)
})