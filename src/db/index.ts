import { MongoClient, Db } from 'mongodb'

const uri = 'mongodb+srv://root:123@bdtopicos.li16m5t.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri)

export { client }