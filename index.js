require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const displayRoutes = require("express-routemap")
const routes = require("./routes/user.routes")
const mysqlConnection = require("./config/mysql")
const authRoute =require('./routes/auth.route')



app.use(bodyParser.json())


const port = process.env.PORT

app.listen(port, () => {
    console.log(`I am listening on port ${port}`)
    displayRoutes(app)
})

app.use(authRoute)

mysqlConnection.connect(err =>{
    if (err) throw err.stack
    console.log("successfully connnected: ", mysqlConnection.threadId)
})

app.use(routes)

app.get("/", (res, req)=>{
    res.status(422).send({
        status: false,
        message: "nothing here yet"
    })
})

app.use((req, res, next) =>{
    res.status(422).send({
        status: false,
        message: "You got lost, Sorry"
    })
})