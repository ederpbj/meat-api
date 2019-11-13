import {ModelRouter} from '../common/model-router';
import * as restify from 'restify';
import {NotFoundError} from 'restify-errors';
import {Restaurant} from './restaurants.model';


class RestaurantsRouter extends ModelRouter<Restaurant>{
    constructor(){
        super(Restaurant)
    }

    findMenu = (req, resp, next) => {
        //Herda de restaurants.model, +menu para reexibir
        Restaurant.findById(req.params.id, "+menu")
            .then(rest => {
                if(!rest){
                    throw new NotFoundError('Restaurant not found')
                }else{
                    resp.json(rest.menu)
                    return next()
                }
            }).catch(next)
    }

    replaceMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id).then(rest=>{
            if(!rest){
                throw new NotFoundError('Restaurant not found')
            }else{
                rest.menu = req.body //Array de MenuItem
                return rest.save()
            }
        }).then(rest=>{
            resp.json(rest.menu)
            return next()
        }).catch(next)

    }

    applyRoutes(application: restify.Server){

        //callbacks 
        application.get('/restaurants', this.findAll)
        application.get('/restaurants/:id', [this.validadeId ,this.findById])
        application.post('/restaurants', this.save)
        application.put('/restaurants/:id', [this.validadeId ,this.replace])
        application.patch('/restaurants/:id', [this.validadeId ,this.update])
        application.del('/restaurants/:id', [this.validadeId ,this.delete])
        
        
        application.get('/restaurants/:id/menu', [this.validadeId ,this.findMenu])
        application.put('/restaurants/:id/menu', [this.validadeId ,this.replaceMenu])
    
      }
}

export const restaurantsRouter = new RestaurantsRouter()