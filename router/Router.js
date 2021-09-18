const {Router} = require('express')
const fs = require("fs");
const path = require('path')
const router = new Router()

router.post('/saveUser', (req, res) => {
    try{
        const {name, surname, email, company, city, msg} = req.body

        // validation

        const pathNeeded = path.join(__dirname, "response.txt")

        // add to text file
        try {
            if (fs.existsSync(pathNeeded)){
                fs.appendFileSync('response.txt', `${name} ${surname} with email: ${email}, works in ${company}, lives in ${city} sent message ${msg} \n\n`)
            } else {
                const CreateFiles = fs.createWriteStream('response.txt', {
                    flags: 'a'
                })
                CreateFiles.write(`${name} ${surname} with email: ${email}, works in ${company}, lives in ${city} sent message ${msg} \n\n`)
            }
        } catch (e) {
          return Error
        }

        res.status(200).send()
    } catch (e) {
        res.send({"error": e.toString()}).status(400)
    }
})

router.get('/hello', (req, res) => {
    let fileContent = fs.readFileSync("response.txt", "utf8");
    res.send(fileContent)
})

module.exports = router