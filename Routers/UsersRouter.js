const { DataResponse, Response } =  require('../Response');
const { createToken } = require('../utiles/token')

const {Role}=  require("@prisma/client");

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const  { PrismaClient } = require('@prisma/client');
const { getAllRequest,putSpecific, getSpecificRequest,getCreatedFormations,GetLikedFormations,getFollowedFormations,GetCompletedContent} = require('../genericRequests');
const { Tables, Identificators } = require('../tables');

const prisma = new PrismaClient();

router.get('/All',async(req,res) => {
    getAllRequest(Tables.User)
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))))
})

router.get('/:id',async(req,res) => {
    
    const {id} = req.params;
    getSpecificRequest(Tables.User,Identificators.Id,id)
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))))
})

router.put('/:id',async(req,res) => {
    const {id} = req.params;
    const data = {
        ProfileImage: req.body.ProfileImage
    }
    putSpecific(Tables.User,Identificators.Id,id,data)
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))))
})

router.get('/:id/CreatedFormations', async(req,res) => {
    const {id} = req.params;

    getCreatedFormations(id)
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))))
})

router.get('/:id/LikedFormations',async(req,res) => {
    const {id} = req.params;

    GetLikedFormations(id)
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))))
})
router.get('/:id/FollowedFormations',async(req,res) => {
    const {id} = req.params

    getFollowedFormations(id)
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))))
    
})

router.get('/:id/CompletedContent',async(req,res) => {
    const {id} = req.params

    GetCompletedContent(id)
    .then((resp) => res.json(resp))
    .catch((err) => res.json(new Response(0,JSON.stringify(err))))  
})

router.post('/login', async (req, res) => {
    const user = await prisma.user.findUnique({
        where : {Email : req.body.Email},
    })
    if(user){
        bcrypt.compare(req.body.Password, user.Password, (err, result) => {
            if(err){
                res.status(500).json(new Response(500, err.message))
            }

            if(result){
                res.status(200).json(new DataResponse(200,createToken(user)));
            }else{
                res.status(400).json(new Response(400, "wrong email/password!"));
            }
            
        })
    }else{
        res.status(400).json(new Response(400, "wrong email/password!"))
    }
})


router.post('/signup', async (req, res) => {

    bcrypt.hash(req.body.Password, 10)
    .then(async (hash) => {
        try{
            const role = req.body.Student ? Role.STUDENT : Role.TEACHER
            const user = await prisma.user.create({
                data: {
                    Nom : req.body.Nom,
                    Prenom : req.body.Prenom,
                    Email : req.body.Email,
                    Password : hash,
                    Role : role
                }
            })
            if(user){
                res.status(200).json(new DataResponse(createToken(user)));
            }
        }catch(e){
            res.status(500).json(new Response(0, e.message))
        }
    })
    .catch(e => res.status(500).json(new Response(0, "error with hash " + e.message )))
});

module.exports = router
