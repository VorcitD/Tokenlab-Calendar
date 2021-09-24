const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');
module.exports = {
    async create(request,response){
        const {email,password} = request.body;

        const user = await connection('users').where('email',email).select().first();

        if(!user){
            return response.status(401).json({error:'No user found'});
        }
        
        const{password_hash} = user;
        
        if(!(await bcrypt.compare(password,password_hash))){
            return response.status(401).json({error:'Password does not match'});
        }

        const{id,name} = user;
        return response.json({
            user:{
                id,
                name,
                email
            },
            token: jwt.sign({id},authConfig.secret,{
                expiresIn:authConfig.expiresIn,
            }),
        });
    }
}