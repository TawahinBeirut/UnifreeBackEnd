
const express = require('express')
const Router =  express.Router();
const {Response,DataResponse} = require('../Response');
const {Tables,Identificators} = require('../tables');
const {getAllRequest,getSpecificRequest,
    postSpecificRequest,putSpecific
    ,deleteAll,deleteSpecific,GetContent} = require('../genericRequests');

Router.get('/',async (req,res) => {
    getAllRequest(Tables.Question)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.get('/:id',async (req,res) => {
    const {id} = req.params
    getSpecificRequest(Tables.Question,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.get('/:id/Responses',async (req,res) => {
    const {id} = req.params;
    GetContent(Tables.Response,Identificators.Question.Id,parseInt(id))
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))))
})

Router.post('/',async (req,res) => {
    const data = {
        QuizzId: req.body.QuizzId,
        Enonce : req.body.Enonce
    }
    postSpecificRequest(Tables.Question,data)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.put('/:id',async (req,res) => {
    const {id} = req.params
    const data = {
        QuizzId: req.body.QuizzId,
        Enonce : req.body.Enonce
    }
    putSpecific(Tables.Question,Identificators.Id,id,data)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

// Speciale 
Router.delete('/',async(req,res) => {
    deleteAll(Tables.Question)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.delete('/:id',async(req,res) => {
    const {id} = req.params
    deleteSpecific(Tables.Question,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

module.exports = Router