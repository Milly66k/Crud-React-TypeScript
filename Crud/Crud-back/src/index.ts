import express from 'express'
import rotas from './rotas'
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();

const app = express()
app.use(cors())

app.use(express.json())
app.use(rotas)

app.listen(process.env.PORT)
