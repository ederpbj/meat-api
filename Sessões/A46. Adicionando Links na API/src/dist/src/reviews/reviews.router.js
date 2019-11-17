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
    envelope(document) {
        let resource = super.envelope(document);
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = `/restaurants/${restId}`;
        return resource;
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
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
exports.reviewsRouter = new ReviewsRouter();
