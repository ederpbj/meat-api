"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
//D: tipo generico para chamadas
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        //Checa se o valor é um objectId valido
        this.validateId = (req, resp, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Document not Found'));
            }
            else {
                next();
            }
        };
        //Get all
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
        //Get
        this.findById = (req, resp, next) => {
            //Método 2
            this.prepareOne(this.model.findById(req.params.id))
                .then(this.render(resp, next))
                .catch(next);
        };
        //Post
        //(=>) usado para capturar o this
        this.save = (req, resp, next) => {
            let document = new this.model(req.body);
            //Aciona a middleware em users.model
            document.save()
                .then(this.render(resp, next))
                .catch(next);
        };
        this.replace = (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            this.model.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return this.prepareOne(this.model.findById(req.params.id));
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(resp, next))
                .catch(next);
        };
        this.update = (req, resp, next) => {
            const options = { runValidators: true, new: true };
            //procura e atualiza
            this.model.findByIdAndUpdate({ _id: req.params.id }, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        };
        this.delete = (req, resp, next) => {
            this.model.remove({ _id: req.params.id })
                .exec()
                .then((cmdResult) => {
                if (cmdResult.result.n) {
                    //console.log("P1: Deu certo xxxxxxxxxxxxxxxxxxx")
                    //Procedimento realizado com sucesso!
                    resp.send(204);
                }
                else {
                    //resp.send(404)
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            }).catch(next);
        };
        this.basePath = `/${model.collection.name}`;
    }
    //Método 2
    prepareOne(query) {
        return query;
    }
    envelope(document) {
        let resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }
}
exports.ModelRouter = ModelRouter;
