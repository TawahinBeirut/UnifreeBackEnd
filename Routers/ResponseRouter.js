const express = require('express')
const Router =  express.Router();
const {Response,DataResponse} = require('../Response');
const {Tables,Identificators} = require('../tables');

const {getAllRequest,getSpecificRequest,
    postSpecificRequest,putSpecific
    ,deleteAll,deleteSpecific} = require('../genericRequests');

Router.get('/',async(req,res) => {
    getAllRequest(Tables.Response)
    .then((resp) => res.json(resp)) 
    .catch(() => res.json(new Response(0,"Non reconnue")))
})

Router.get('/:id',async (req,res) => {
    const {id} = req.params
    getSpecificRequest(Tables.Response,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.post('/',async (req,res) => {
    const data = {
        QuestionId : req.body.QuestionId,
        Right : req.body.Right,
        Contenu : req.body.Contenu
    }
    postSpecificRequest(Tables.Response,data)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.put('/:id',async (req,res) => {
    const {id} = req.params
    const data = {
        QuestionId : req.body.QuestionId,
        Right : req.body.Right
    }
    putSpecific(Tables.Response,Identificators.Id,id,data)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

// Speciale 
Router.delete('/',async(req,res) => {
    deleteAll(Tables.Response)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.delete('/:id',async(req,res) => {
    const {id} = req.params
    deleteSpecific(Tables.Response,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})



module.exports = Router