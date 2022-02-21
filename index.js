require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const displayRoutes = require("express-routemap")

const mysqlConnection = require("./config/mysql")



app.use(bodyParser.json())
const port = process.env.PORT

app.listen(port, () => {
    console.log(`I am listening on port ${port}`)
    displayRoutes(app)
})
mysqlConnection.connect(err =>{
    if (err) throw err.stack
    console.log("successfully connnected: ", mysqlConnection.threadId)
})


app.get("/", (res, req)=>{
    res.status(422).send({
        status: false,
        message: "nothing here yet"
    })
})

app.use((req, res, next) =>{
    res.status(422).send({
        status: false,\
        message: "You got lost, Sorry"
    })
})