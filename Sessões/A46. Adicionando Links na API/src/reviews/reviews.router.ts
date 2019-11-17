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

    envelope(document){
        let resource = super.envelope(document)
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant
        resource._links.restaurant = `/restaurants/${restId}`
        return resource
      }

    applyRoutes(application: restify.Server){
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)

        /*
        //callbacks 
        application.get('/reviews', this.findAll)
        application.get('/reviews/:id', [this.validateId ,this.findById])
        application.post('/reviews', this.save)
        // Não necessário
        application.put('/reviews/:id', [this.validateId ,this.replace])
        application.patch('/reviews/:id', [this.validateId ,this.update])
        application.del('/reviews/:id', [this.validateId ,this.delete]) 
        */
  
    
      }
}

export const reviewsRouter = new ReviewsRouter()