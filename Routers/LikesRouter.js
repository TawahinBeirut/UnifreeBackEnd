const { DataResponse, Response } =  require('../Response');
const { PrismaClient } = require('prisma/prisma-client')
const prisma = new PrismaClient();
const { Tables, Identificators } = require('../tables');

const express = require('express')
const Router = express.Router()
const {Tables,Identificators} = require('../tables');
const {getAllRequest,getSpecificRequest,
    postSpecificRequest,putSpecific
    ,deleteAll,deleteSpecific} = require('../genericRequests');

Router.get('/',async(req,res) => {
    getAllRequest(Tables.Like)
    .then((resp) => res.json(resp)) 
    .catch(() => res.json(new Response(0,"Non reconnue")))
})

Router.get('/:id',async (req,res) => {
    const {id} = req.params
    getSpecificRequest(Tables.Like,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.post('/',async (req,res) => {
    const data = {
        AuthorId: req.body.AuthorId,
        FormationId: req.body.FormationId
    }
    postSpecificRequest(Tables.Like,data)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.post('/:id',async (req,res) => {
    const data = {
        AutorId : req.body.AuthorId,
        FormationId: req.body.FormationId
    }
    let res = await prisma.like.deleteMany({
        where:{
            AuthorId : data.AutorId,
            FormationId: data.FormationId
        }
    }).then(() => {return new Response(200,"reussi")}).catch((err) => {return new Response(0,"echoue")})
})
// Speciale 
Router.delete('/',async(req,res) => {
    deleteAll(Tables.Like)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})

Router.delete('/:id',async(req,res) => {
    const {id} = req.params
    deleteSpecific(Tables.Like,Identificators.Id,id)
    .then((resp) =>  res.json(resp))
    .catch(() => res.json(new Response(0,"Erreur inconnue")));
})



module.exports = Router
