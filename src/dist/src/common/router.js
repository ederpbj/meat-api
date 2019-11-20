"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const restify_errors_1 = require("restify-errors");
class Router extends events_1.EventEmitter {
    //A45 - criando links
    envelope(document) {
        return document;
    }
    //A47 Paginação - Skip e Limit
    envelopeAll(documents, options = {}) {
        return documents;
    }
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(this.envelope(document));
            }
            else {
                //response.send(404)
                throw new restify_errors_1.NotFoundError('Documento não encontrado');
            }
            //Indica ao restifi que a callback terminou de trabalhar
            return next(false);
        };
    }
    renderAll(response, next, options = {}) {
        return (documents) => {
            if (documents) {
                //documents.forEach(document=>{
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', document);
                    array[index] = this.envelope(document);
                });
                //response.json(documents)
                response.json(this.envelopeAll(documents, options));
            }
            else {
                //response.json([])
                response.json(this.envelopeAll([]));
            }
            return next(false);
        };
    }
}
exports.Router = Router;
