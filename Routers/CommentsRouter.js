const { DataResponse, Response } =  require('../Response');
const { createToken } = require('../utiles/token')

const express = require('express')
const router = express.Router()

const  { PrismaClient } = require('@prisma/client');
const { postSpecificRequest, putSpecific, deleteSpecific, getSpecificRequest, deleteAll } = require('../genericRequests');
const { Tables } = require('../tables');

const prisma = new PrismaClient();


router.get('/', async (req, res) => {
    try{
        prisma.commentaire.findMany()
        .then((comments) => {
            res.status(200).json(new DataResponse(200, comments))
        }).catch(e => res.status(400).json(new Response(400, "no comments :" + e)))
    }catch(e){
        res.status(500).json(new Response(500, "Server Error  :" + e.message))
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    // getSpecificRequest(Tables.Comment, "FormationId", id)
    prisma.commentaire.findMany({
        where :{
            "FormationId" : parseInt(id)
        }
    })
    .then(resp => res.status(200).json(resp))
    .catch(e => res.status(400).json(new Response(400,"Erreur inconnue  :" + e.message)))
})


router.post('/', async (req, res) => {
    try{
        const data = {
                AuthorId :  req.body.AuthorId,
                FormationId : req.body.FormationId,
                Contenu : req.body.Contenu
            };
        postSpecificRequest(Tables.Comment, data)
        .then(resp => {res.json(resp)})
        .catch(e => res.status(400).json(new Response(400,"Erreur inconnue")))
        
        //working old code 
        // prisma.commentaire.create({
        //     data : {
        //         AuthorId :  req.auth.user.Id,
        //         FormationId : req.body.FormationId,
        //         Contenu : req.body.Contenu
        //     }
        // })
        // .then((comments) => {
        //     res.status(200).json(new DataResponse(200, comments))
        // }).catch(e => {
        //     res.status(400).json(new Response(400, "no comments :" + e))
        // })
    }catch(e){
        res.status(500).json(new Response(500, "Server Error  :" + e.message))
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const data = {
                AuthorId :  req.body.AuthorId,
                FormationId : req.body.FormationId,
                Contenu : req.body.Contenu
    }
    putSpecific(Tables.Comment, "Id", id, data)
    .then(resp => res.status(200).json(resp))
    .catch(e => res.status(400).json(new Response(400, "Server Error")))
})

router.delete('/',async (req,res) => {
    const {id} = req.params

    deleteAll(Tables.Comment)
    .then((resp) => res.json(resp))
    .catch(e => res.status(400).json(new Response(400, "Server Error")))
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params

    deleteSpecific(Tables.Comment, "Id", id)
    .then(resp => res.status(200).json(resp))
    .catch(e => res.status(400).json(new Response(400, "Server Error")))
})


module.exports = router
