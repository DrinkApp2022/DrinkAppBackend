import { client } from '../db'
import { Request, Response } from 'express'

const database = client.db('bd_topicos')
const collection = database.collection('products')

class ProductController {

	async insert (req: Request, res: Response) {
		const { title, description, price } = req.body

		collection.insertOne({ title, description, price })

		return res.json({
			status: 200,
			success: 'Produto cadastrado com sucesso!'
		})
	}

	async list (req: Request, res: Response) {
		const list = await collection.find().toArray()
		return res.json(list)
	}
}

export {ProductController}