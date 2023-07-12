import express from 'express'
import router from './router'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Simple API homepage');
})

// app.use((err: Error, res: Response) => {
//     console.log(err)
//     res.json({message: `Error: ${err.message}`})
// })

export default app