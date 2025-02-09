import express from 'express'
import { router } from './routes/v1'
const app = express()

app.use(express.json())
const PORT = 3000

app.use('/api/v1', router)


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})