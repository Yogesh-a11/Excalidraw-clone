import express from 'express'
import { router } from './routes/v1'
const app = express()
import cors from "cors";
// ...
app.use(cors()); // This allows all orig

app.use(express.json())
const PORT = 3001

app.use('/api/v1', router)


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
}) 