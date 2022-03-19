require("dotenv").config()
const sgMail = require('@sendgrid/mail')
const handleBars = require("handlebars")
const fs = require("fs")
const path = require("path")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const readMyFile = (dirpath) => {
    return new Promise((resolve, reject)=>{
        fs.readFile(dirpath, {encoding: "utf-8"},
        (err, fileread) => {
            if (err) {
                reject(err)
            }
            resolve(fileread)
        })
    })
}

const readFileAndSendEmail = async (toEmail, emailHeader, dataReplacement, filename) => {
    let dirpath = path.join(__dirname, `../views/templates/${filename}.html`)
    let readTheFile = await readMyFile(dirpath)
    const template = handleBars.compile(readTheFile)
    const result = template(dataReplacement)
    const msg = {
        to: toEmail,
        from: "info@afriglobal.com.ng",
        subject: emailHeader,
        html: result
    }
    sgMail.send(msg)
    .then(() =>{
        console.log("success")
        return "success"
    } )
    .catch(err => {
        // console.log("error: ", JSON.stringify(err.response.body))
        console.log("failed", err.message) 
        return "failed"
    })
}

module.exports = {
    readFileAndSendEmail
}