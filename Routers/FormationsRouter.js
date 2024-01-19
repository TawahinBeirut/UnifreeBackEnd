const express = require('express')
const Router = express.Router();
const { Response, DataResponse } = require('../Response');
const { PrismaClient } = require('prisma/prisma-client')
const prisma = new PrismaClient();
const { Tables, Identificators } = require('../tables');
const { getAllRequest, getSpecificRequest,
    postSpecificRequest, putSpecific
    , deleteAll, deleteSpecific
    , CheckisComplete, PutisComplete, initContent, GetContent, GetQuizzFormation, GetNbLikes, PostFormation,putFormation } = require('../genericRequests');
const { Prisma } = require('prisma/prisma-client');

Router.get('/', async (req, res) => {
    let resp = getAllRequest(Tables.Formation)
        .then((resp) => res.json(resp))
        .catch((err) => res.json(new Response(0, "Erreur Inconnue")))
})

Router.get('/:id', async (req, res) => {
    const { id } = req.params
    getSpecificRequest(Tables.Formation, Identificators.Id, id)
        .then((resp) => res.json(resp))
        .catch(() => res.json(new Response(0, "Erreur inconnue")))
})

Router.get('/:id/Likes', async (req, res) => {
    const { id } = req.params
    GetNbLikes(id)
        .then((resp) => res.json(resp))
        .catch(() => res.json(new Response(0, "Erreur inconnue")))
})

Router.get('/:id/Lessons', async (req, res) => {
    const { id } = req.params;
    GetContent(Tables.Lesson, Identificators.Formation.Id, parseInt(id))
        .then((resp) => res.json(resp))
        .catch((err) => res.json(new Response(0, "Erreur inconnue")))
})

Router.get("/:id/Quizzs", async (req, res) => {
    const { id } = req.params;
    GetQuizzFormation(id)
        .then((resp) => res.json(resp))
        .catch((err) => res.json(new Response(0, "Erreur inconnue")))
})

Router.get("/:id/Comments", async (req, res) => {
    const { id } = req.params;
    GetContent(Tables.Comment, Identificators.Formation.Id, parseInt(id))
        .then((resp) => res.json(resp))
        .catch((err) => res.json(new Response(0, "Erreur inconnue")))
})

Router.post('/', async (req, res) => {
    const Formation = {
        Categorie: req.body.Categorie,
        AuthorId: req.body.AuthorId,
        Titre: req.body.Titre,
        Description: req.body.Description,
    }
    const Lessons = req.body.Lessons

    PostFormation(Formation,Lessons)
    .then((resp) => res.json(resp))
    .catch((err) => res.json(err))
})

// Fait le système ou tu supp toutes les lessons et tu les reajoutes ( tu gardes la forma + Tu modifies les infos)
Router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const Formation = {
        Categorie: req.body.Categorie,
        AuthorId: req.body.AuthorId,
        Titre: req.body.Titre,
        Description: req.body.Description,
    }
    const Lessons = req.body.Lessons

    putFormation(id,Formation,Lessons)
        .then((resp) => res.json(resp))
        .catch((err) => res.json(new Response(0,err.message)));

})

// Speciale 
Router.delete('/', async (req, res) => {
    deleteAll(Tables.Formation)
        .then((resp) => res.json(resp))
        .catch(() => res.json(new Response(0, "Erreur inconnue")));
})

Router.delete('/:id', async (req, res) => {
    const { id } = req.params
    deleteSpecific(Tables.Formation, Identificators.Id, id)
        .then((resp) => res.json(resp))
        .catch((err) => res.json(new Response(0, JSON.stringify(err))));
})

Router.post('/joinFormation/:id', async (req, res) => {
    const { id } = req.params;
    const UserId = req.body.UserId;

    initContent(Tables.StatutFormation, Identificators.Formation.Id, id, UserId)
        .then((resp) => res.json(resp))
        .catch((err) => res.json(new Response(0, JSON.stringify(err))));
})


Router.post('/PutIsComplete/:id', async (req, res) => {
    const { id } = req.params;
    const UserId = req.body.UserId

    PutisComplete(UserId, id)
        .then((resp) => res.json(resp))
        .catch((err) => res.json(new Response(0, err)));
})

Router.post('/CheckIsJoined/:id', async (req, res) => {
    const { id } = req.params;
    const UserId = req.body.UserId;

    CheckisComplete(Tables.StatutFormation, UserId, id, Identificators.Formation.Id, Identificators.Formation.IdTitle)
        .then((resp) => res.json(resp))
        .catch(() => res.json(new Response(0, "Erreur inconnue")));
})


module.exports = Router;