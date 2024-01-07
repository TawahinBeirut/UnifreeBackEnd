const express = require('express')
const Router =  express.Router();
const {Response,DataResponse} = require('../Response');
const {Tables,Identificators} = require('../tables');
const {getAllRequest,getSpecificRequest,
    postSpecificRequest,putSpecific
    ,deleteAll,deleteSpecific,
    CheckisComplete,PutisComplete, initContent} = require('../genericRequests');


Router.get('/',async (req,res) => {
    getAllRequest(Tables.Lesson)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.get('/:id',async (req,res) => {
    const {id} = req.params
    getSpecificRequest(Tables.Lesson,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.post('/',async (req,res) => {
    const data = {
        FormationId: req.body.FormationId,
        Titre: req.body.Titre,
        Description : req.body.Description,
        Contenu : req.body.Contenu
    }
    postSpecificRequest(Tables.Lesson,data)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.put('/:id',async (req,res) => {
    const {id} = req.params
    const data = {
        FormationId: req.body.FormationId,
        Titre: req.body.Titre,
        Description : req.body.Description,
        Contenu : req.body.Contenu
    }

    putSpecific(Tables.Lesson,Identificators.Id,id,data)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

// Speciale 
Router.delete('/',async(req,res) => {
    deleteAll(Tables.Lesson)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.delete('/:id',async(req,res) => {
    const {id} = req.params
    deleteSpecific(Tables.Lesson,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.post('/PutIsRead/:id', async (req,res) => {
    const {id} = req.params;
    const {UserId}  = req.body

    initContent(Tables.StatutLesson,Identificators.Lecon.Id,id,UserId)
    .then((resp) => res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.post('/CheckIsRead/:id',async (req,res) => {
    const {id} = req.params;
    const {UserId} = req.body

    CheckisComplete(Tables.StatutLesson,UserId,id,Identificators.Lecon.Id,Identificators.Lecon.IdTitle)
    .then((resp) => res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})  

module.exports = Router