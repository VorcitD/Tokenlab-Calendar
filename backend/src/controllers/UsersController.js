const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports ={
    async create(request,response){
            const {name,email,password} = request.body;

            const check_user = await connection('users').where('email',email).select().first();
            
            if(check_user){
                return response.status(409).json({error:'User already exists'});
            }

            const password_hash = await bcrypt.hash(password,8);
            await connection('users').insert({
                name,
                email,
                password_hash
            })
        
            return response.status(201).json({message:'User created successfully!'});
        },

    async index(request,response){

        const users = await connection('users').select('*');
        return response.json(users);
    },
    
};