import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
import { getAllHadits,getAllKitabName,getHaditsByKitab } from './controllers/bukhariController.js'

const app = express()
const port = 3001
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
// app.use(bodyParser.json())

app.use(express.urlencoded()); 
app.use(cors())

app.post('/search',getAllHadits)
app.get('/kitab',getAllKitabName)
app.get('/kitab/:nama_kitab',getHaditsByKitab)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })