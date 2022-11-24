import { client } from '../db'
import { Request, Response } from 'express'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

type User = {
	_id: string
	name: string
	email: string
	password: string
	admin: boolean
}

const database = client.db('bd_topicos')
const collection = database.collection('users')

class UserController {
	async insert (req: Request, res: Response) {
		const { name, email, password, admin } = req.body

		const emailAlreadyExists = await collection.findOne({email})

		if (emailAlreadyExists) {
			throw new Error('Email já existente')
		}
		
		const passwordHash = await hash(password, 8)

		await collection.insertOne({
			name,
			email,
			password: passwordHash,
			admin
		})

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
		const list = await collection.findOne<User>({email})
		if (!list) {
			throw new Error('Usuário não encontrado!')
		}
		const passwordMatch = await compare(password, list.password)
		if (!passwordMatch) {
			throw new Error('Senha Incorreta!')
		}
		const token = sign({
			email: list.email
		}, '2a82dece199a9ebf53712830a5e0dfec',
			{
				subject: list._id.toString(),
				expiresIn: '1d'
			})
		return res.json({ accessToken: token })
	}
}

export { UserController }
