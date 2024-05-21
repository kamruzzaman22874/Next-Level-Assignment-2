import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductsRoute } from './app/modules/products/products.route'
const app: Application = express()
// parser
app.use(express.json())
app.use(cors())


// middleware 

app.use("/api/products", ProductsRoute)

app.get('/', (req: Request, res: Response) => {
    
    res.send("Hello world !!!!")
})
// console.log(process.cwd())

export default app
