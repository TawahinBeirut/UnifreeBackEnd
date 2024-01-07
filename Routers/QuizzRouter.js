
const express = require('express')
const Router =  express.Router();
const {Response,DataResponse} = require('../Response');
const {Tables,Identificators} = require('../tables');
const {getAllRequest,getSpecificRequest,
    postSpecificRequest,putSpecific
    ,deleteAll,deleteSpecific, initContent,GetContent,
    GetQuizz,CreateQuizz,CheckisComplete} = require('../genericRequests');

Router.get('/',async (req,res) => {
    getAllRequest(Tables.Quizz)
    .then((resp) =>  res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))));
})

Router.get('/:id',async (req,res) => {
    const {id} = req.params
    GetQuizz(id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.get('/:id/Questions',async (req,res) => {
    const {id} = req.params;
    GetContent(Tables.Question,Identificators.Quizz.Id,parseInt(id))
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,"Erreur inconnue")))
})

Router.post('/',async (req,res) => {
    const data = {
        FormationId : req.body.FormationId,
        Titre : req.body.Titre,
        Description : req.body.Description
    }
    postSpecificRequest(Tables.Quizz,data)
    .then((resp) =>  res.json(resp))    
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.put('/:id',async (req,res) => {
    const {id} = req.params;
    const data = {
        FormationId : req.body.FormationId,
        Titre : req.body.Titre,
        Description : req.body.Description
    }
    putSpecific(Tables.Quizz,Identificators.Id,id,data)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

// Speciale 
Router.delete('/',async(req,res) => {
    deleteAll(Tables.Quizz)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.delete('/:id',async(req,res) => {
    const {id} = req.params
    deleteSpecific(Tables.Quizz,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})


Router.post('/PutIsComplete/:id', async (req,res) => {
    const {id} = req.params;
    const {UserId}  = req.body

    initContent(Tables.StatutQuizz,Identificators.Quizz.Id,id,UserId)
    .then((resp) => res.json(resp)) 
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.post('/CheckIsComplete/:id',async (req,res) => {
    const {id} = req.params;
    const {UserId} = req.body

    CheckisComplete(Tables.StatutQuizz,UserId,id,Identificators.Quizz.Id,Identificators.Quizz.IdTitle)
    .then((resp) => res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

module.exports = Router