const jwt = require('jsonwebtoken')
const { Response } = require('../Response')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT)
        const user = decodedToken 
        delete user.iat
        delete user.exp
        req.auth   = {
            user : user
        },
        console.log(user)
        next()
    }catch(e){
        res.status(500).json(new Response(500, "You hav to authentify yourself!"))
    }
} 