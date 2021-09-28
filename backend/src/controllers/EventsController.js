const connection = require('../database/connection');
const isAfter = require('date-fns/isAfter');

module.exports = {
    async create(request,response){
        
        const {description, init_date,end_date} = request.body;
        const users_id = request.userId;
        const check_user = await connection('users').where('id',users_id).select().first();

        if(!check_user){
            return response.status(400).json({error:'User does not exist'});
        }

        const iDateForm = Date.parse(init_date);
        const eDateForm = Date.parse(end_date);
        
        const dateNow = Date.now();

        
        if(isAfter(iDateForm,eDateForm)){
            return response.status(400).json({error:"A data de término é anterior à data de inicio do evento!"});
        }
        if(isAfter(dateNow,iDateForm)){
            return response.status(400).json({error:"A data de inicio do evento é uma data passada!"});
        }

        await connection('events').insert({
            users_id,
            description,
            init_date,
            end_date
        })
        
        return response.status(201).send();

    },

    async delete(request,response){
        const {id} = request.params;
        
        const check_id = await connection('events').where('id',id).select().first();

        if(!check_id){
            return response.status(400).send();
        }

        await connection('events').where('id',id).select().del();
        return response.status(200).send();
        
    },

    async index(request,response){
        const users_id = request.userId;
        const events = await connection('events').where('users_id',users_id).select('*');

        return response.json(events);
    },

    async update(request,response){
        const {id} = request.params;

        const {description,init_date,end_date}= request.body;
        
        const check_id = await connection('events').where('id',id).select().first();

        if(!check_id){
            return response.status(400).send();
        }

        const iDateForm = Date.parse(init_date);
        const eDateForm = Date.parse(end_date);

        if(isAfter(iDateForm,eDateForm)){
            return response.status(400).json({error:"A data de término é anterior à data de inicio do evento!"});
        }

        const dateNow = Date.now();
        if(isAfter(dateNow,iDateForm)){
            return response.status(400).json({error:"A data de inicio do evento é uma data passada!"});
        }

try{
        await connection('events').where('id',id).select().update(
            {
                description,
	            init_date,
	            end_date
            }
        );
}catch(error){
    return response.status(400).json({error:"Não foi possivel atualizar"})
}
        return response.status(200).send();

    }
}