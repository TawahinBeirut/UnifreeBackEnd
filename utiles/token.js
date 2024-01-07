
const jwt = require('jsonwebtoken')

//create a JWT token 
 const createToken = (user) => {
    const JwtToken = jwt.sign(
        user,
        process.env.SECRET_JWT,
        {
            expiresIn : 60 * 60 * 24,
            algorithm: 'HS256'
        }
    )
    return {
        user,
        JwtToken
    }
}


module.exports = {createToken}