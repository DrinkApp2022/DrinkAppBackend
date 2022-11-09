import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { router } from './routes'
import { client } from './db'

const app = express()
const port = 3000

app.use(express.json())
app.use(router)
client.connect()

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error!"
    })
})

app.listen(port, () => console.log(`server listening port ${port}`))