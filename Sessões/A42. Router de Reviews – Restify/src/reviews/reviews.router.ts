import * as restify from 'restify';
import * as mongoose from 'mongoose';

import {ModelRouter} from '../common/model-router';
import {Review} from './reviews.model';


class ReviewsRouter extends ModelRouter<Review>{
    constructor(){
        super(Review)
    }

    /* Método 1, sobrescreve o findById
    findById = (req, resp, next) => {
        this.model.findById(req.params.id)
            //no Get/id, Popula o documento, user campo nome,
            .populate('user', 'name')
            //Popula o documento, restaurant campo nome,
            .populate('restaurant', 'name')
            .then(this.render(resp, next))
            .catch(next)
    }
    */

    //Método 2, modifica query antes de executar
   protected prepareOne(query: mongoose.DocumentQuery<Review,Review>):mongoose.DocumentQuery<Review,Review>{
    return query.populate('user', 'name')
                .populate('restaurant', 'name')
    }

    applyRoutes(application: restify.Server){

        //callbacks 
        application.get('/reviews', this.findAll)
        application.get('/reviews/:id', [this.validadeId ,this.findById])
        application.post('/reviews', this.save)
        /* Não necessário
        application.put('/reviews/:id', [this.validadeId ,this.replace])
        application.patch('/reviews/:id', [this.validadeId ,this.update])
        application.del('/reviews/:id', [this.validadeId ,this.delete]) 
        */
  
    
      }
}

export const reviewsRouter = new ReviewsRouter()