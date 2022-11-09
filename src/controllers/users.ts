import { client } from '../db'
import { Request, Response } from 'express'

const database = client.db('bd_topicos')
const collection = database.collection('users')

class UserController {
	async insert (req: Request, res: Response) {
		const { name, email, password, admin } = req.body
		collection.insertOne({ name, email, password, admin })

		return res.json({
			status: 200,
			success: 'Seu cadastro foi realizado com sucesso!'
		})
	}
	async list (req: Request, res: Response) {
		const list = await collection.find().toArray()
		return res.json(list)
	}
	async login (req: Request, res: Response) {
		const { email, password } = req.body
		const list = await collection.findOne({email})
		if (!list) {
			throw new Error('Usuário não encontrado!')
		}
		return res.json(list)
	}
}

export { UserController }