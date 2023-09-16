import express from 'express'
import itemRoutes from './src/items.js'

const app = express()
const port = 3000
// allows us to parse json 
app.use(express.json())

app.get('/', (req, res) => res.send('Hello world!.!'))
app.use('/items', itemRoutes)

app.listen(port, () => console.log(`API server ready on http://localhost:${port}`))