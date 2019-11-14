"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
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
    prepareOne(query) {
        return query.populate('user', 'name')
            .populate('restaurant', 'name');
    }
    applyRoutes(application) {
        //callbacks 
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validadeId, this.findById]);
        application.post('/reviews', this.save);
        /* Não necessário
        application.put('/reviews/:id', [this.validadeId ,this.replace])
        application.patch('/reviews/:id', [this.validadeId ,this.update])
        application.del('/reviews/:id', [this.validadeId ,this.delete])
        */
    }
}
exports.reviewsRouter = new ReviewsRouter();
