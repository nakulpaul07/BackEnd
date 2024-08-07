const express= require('express')
const app = express()
const port = 4000
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const web = require('./routes/web')




// for connectivity to react
const cors = require('cors')
app.use(cors())



// fileuploader for image
const fileuploader = require('express-fileupload')

// call function of fileuploader
app.use(fileuploader({ useTempFiles: true }))

// for dataget in ap (change formate)
app.use(express.json())



const cookieParse = require('cookie-parser')

// token gET
app.use(cookieParse());




// Connect to maongoose
const connectDb = require('./db/connectdb')
connectDb()










// load route
app.use('/api', web)
// Localhost:4000/api


// server create
app.listen(port, () => console.log("server start localhost : 4000"))
