const jwt = require('jsonwebtoken');

const decodeToken = (req,res,next) =>{
    console.log("Decoding Token for user")
    const token = req.headers['authorization']
    if(!token) {
        res.status(403).send("No auth provided in header")
        return false
    }
    console.log('User token:', token)
    const accToken = token.split(" ")
    //issue with extra quotes when splitting
    if(accToken[0] !== "Bearer"){
        console.log('wrong token type', accToken)
        res.status(401)
        return false
    }
    jwt.verify(
        accToken[1],
        Buffer.from(process.env.TSK, 'base64'),
        (err, decoded) => {
            console.log("decoded", decoded)
            if(err){
                console.log(err);
                res.sendStatus(401).send(accToken);
            }
            else {
                console.log("Authenticated");
                res.user_id = decoded.user_id;
                console.log(decoded)
                next(); 
            }
        }
    )
}

module.exports = decodeToken