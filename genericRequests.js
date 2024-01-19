const { PrismaClient } = require('prisma/prisma-client')
const prisma = new PrismaClient();
const { Tables, Identificators } = require('./tables');
const { Response, DataResponse } = require('./Response');

const identifyTable = (value) => {
    let table;
    switch (value) {
        case Tables.Formation: table = prisma.formation; break;
        case Tables.Comment: table = prisma.commentaire; break;
        case Tables.Like: table = prisma.like; break;
        case Tables.Lesson: table = prisma.lecon; break;
        case Tables.Question: table = prisma.question; break;
        case Tables.Quizz: table = prisma.quizz; break;
        case Tables.Response: table = prisma.response; break;
        case Tables.User: table = prisma.user; break;
        case Tables.StatutLesson: table = prisma.statutUtilisateurLecon; break;
        case Tables.StatutQuizz: table = prisma.statutUtilisateurQuizz; break;
        case Tables.StatutFormation: table = prisma.statutUtilisateurFormation; break;
        default: table = null; break;
    }
    return table;
}

const getAllRequest = async (tableName) => {
    const table = identifyTable(tableName);
    let resp;

    if (table != null) {
        try {

            const result = await table.findMany({})
            resp = new DataResponse(200, "Requete réussie", result)
        } catch (e) {
            resp = new Response(0, "Echec de la requete")
        }
    }
    else {
        resp = new Response(0, 'Erreur non reconnue');
    }
    return resp;
}

const getSpecificRequest = async (tableName, idName, idValue) => {
    const table = identifyTable(tableName);
    let resp;

    if (table != null) {
        try {
            const result = await table.findUnique({
                where: {
                    // à corriger   
                    [idName]: parseInt(idValue)
                },
            })
            resp = new DataResponse(200, "Requete réussie", result)
        }
        catch (e) {
            resp = new Response(0, JSON.stringify(e))
        }
    }
    else {
        resp = new Response(0, 'Erreur non reconnue');
    }
    return resp
}

const postSpecificRequest = async (tableName, data) => {
    const table = identifyTable(tableName);
    let resp;

    if (table != null) {
        try {
            const result = await table.create({
                data: {
                    ...data
                }
            })
            resp = new DataResponse(200, "Requete Reussie", result)
        } catch (e) {
            resp = new Response(0, JSON.stringify(e))
        }
    }
    else {
        resp = new Response(0, 'Erreur non reconnue');
    }
    return resp;
}

const putSpecific = async (tableName, idName, idValue, data) => {
    const table = identifyTable(tableName);
    let resp;

    if (table != null) {
        try {
            const result = await table.update({
                where: {
                    [idName]: parseInt(idValue)
                },
                data: {
                    ...data
                }
            })
            resp = new DataResponse(200, "Requete Reussie", result)
        } catch (e) {
            resp = new Response(0, JSON.stringify(e))
        }
    }
    else {
        resp = new Response(0, 'Erreur non reconnue');
    }

    return resp;
}

const deleteAll = async (tableName) => {
    const table = identifyTable(tableName);
    let resp;

    if (table != null) {
        try {
            const result = await table.deleteMany({});
            resp = new DataResponse(200, "Requete Reussie", result)

        } catch (e) {
            resp = new Response(0, JSON.stringify(e))
        }
    }
    else {
        resp = new Response(0, 'Erreur non reconnue');
    }
    return resp;
}

const deleteSpecific = async (tableName, idName, idValue) => {
    const table = identifyTable(tableName);
    let resp;

    if (table != null) {
        try {
            const result = await table.deleteMany({
                where: {
                    [idName]: parseInt(idValue)
                }
            });
            resp = new DataResponse(200, "Requete Reussie", result)

        } catch (e) {
            resp = new Response(0, JSON.stringify(e))
        }
    }
    else {
        resp = new Response(0, 'Erreur non reconnue');
    }
    return resp;
}

const CheckisComplete = async (tableName, UserId, ContentId, ContentTitle, IdTitle) => {
    const table = identifyTable(tableName)
    let resp;

    if (table != null) {
        try {
            const result = await table.findUnique({
                where: {
                    [IdTitle]: {
                        UserId: parseInt(UserId),
                        [ContentTitle]: parseInt(ContentId)
                    }
                }
            });
            resp = new DataResponse(200, "Récuperation des donnés réussie", result)
        } catch (e) {
            resp = new Response(0, JSON.stringify(e))
        }
    }
    else {
        resp = new Response(0, 'Erreur non reconnue');
    }
    return resp;
}

const PutisComplete = async (userId, ContentId) => {
    let resp;

    try {
        const result = await prisma.statutUtilisateurFormation.update({
            where: {
                [Identificators.Formation.IdTitle]: {
                    UserId: parseInt(userId),
                    FormationId: parseInt(ContentId)
                }
            }
            ,
            data: {
                isCompleted: true
            }
        });
        resp = new DataResponse(200, "Récuperation des donnés réussie", result)
    } catch (e) {
        resp = new Response(0, JSON.stringify(e))
    }
    return resp;
}

const postStatut = async (tableName, UserId, ContentId, ContentTitle) => {
    const table = identifyTable(tableName);
    let resp;

    if (table != null) {
        try {
            const result = await table.create({
                data: {
                    UserId: UserId,
                    [ContentTitle]: ContentId
                }
            })
            resp = new DataResponse(200, "Récuperation des donnés réussie", result)
        } catch (e) {
            resp = new Response(0, JSON.stringify(e))
        }
    }
    else {
        resp = new Response(0, 'Erreur non reconnue');
    }
    return resp;
}

const initContent = async (tableName, IdTitle, ContentId, UserId) => {
    const table = identifyTable(tableName)
    let resp;

    try {
        const result = await table.create({
            data: {
                UserId: parseInt(UserId),
                [IdTitle]: parseInt(ContentId)
            }
        })
        resp = new DataResponse(200, "Recuperation reussie", result);

    } catch (e) {
        resp = new Response(0, JSON.stringify(e));
    }
    return resp;
}
const GetContent = async (tableName, ParameterName, ParameterId) => {
    const table = identifyTable(tableName);
    let resp;
    if (table != null) {
        try {
            const result = await table.findMany({
                where: {
                    [ParameterName]: ParameterId,
                }
            })
            resp = new DataResponse(200, "Data récupérée", result)
        } catch (e) {
            resp = new Response(0, "Erreur non reconnue");
        }
    } else {
        resp = new Response(0, "Erreur non reconnue");
    }
    return resp;
}

const GetQuizzFormation = async (id) => {
    let resp;
    try {

        let Quizzs = [];
        const quizzs = await prisma.quizz.findMany({
            where: {
                FormationId: parseInt(id),
            }
        })

        for (let i = 0; i < quizzs.length; i++) {
            const res = await getQuizz(quizzs[i].Id);
            Quizzs.push(res)
        }
        resp = new DataResponse(200, "Data recuperee", Quizzs);
    } catch (error) {
        resp = new Response(0, "Erreur non reconnue")
    }
    return resp;
}

const GetQuizz = async (id) => {
    const resp = getQuizz(id)
    return resp;
}

const getQuizz = async (id) => {
    let Quizz = {
        isQuizz: true,
        id: null,
        title: null,
        description: null,
        content: {
            questions: []
        }
    }
    const quizz = await prisma.quizz.findUnique({
        where: {
            Id: parseInt(id)
        }
    })

    Quizz.id = quizz.Id
    Quizz.title = quizz.Titre;
    Quizz.description = quizz.Description;

    const questions = await prisma.question.findMany({
        where: {
            QuizzId: quizz.Id
        }
    })

    for (let i = 0; i < questions.length; i++) {
        let tmpQuestion = {
            id: questions[i].Id,
            title: questions[i].Enonce,
            answers: []
        }
        const responses = await prisma.response.findMany({
            where: {
                QuestionId: questions[i].Id
            }
        })
        for (let j = 0; j < responses.length; j++) {
            let tmpResponse = {
                id: responses[j].Id,
                title: responses[j].Contenu,
                isCorrect: responses[j].Right
            }
            tmpQuestion.answers.push(tmpResponse);
        }
        Quizz.content.questions.push(tmpQuestion);
    }
    return Quizz;
}

const CreateQuizz = async (data) => {
    let resp;
    try {
        let tmpQuizz = {
            FormationId: data.FormationId,
            Titre: data.Titre,
            Description: data.Description,
        }

        const res1 = await prisma.quizz.create({
            data: {
                FormationId: tmpQuizz.FormationId,
                Titre: tmpQuizz.Titre,
                Description: tmpQuizz.Description
            }
        })

        let questions = data.Questions;
        for (let i = 0; i < questions.length; i++) {
            const res2 = await prisma.question.create({
                data: {
                    QuizzId: res1.Id,
                    Enonce: questions[i].enonce
                }
            })

            let answers = questions[i].answers;
            for (let j = 0; j < answers.length; j++) {
                const res3 = await prisma.response.create({
                    data: {
                        QuestionId: res2.Id,
                        Contenu: answers[i].contenu,
                        Right: answers[i].isRight
                    }
                })
            }
        }
        return new Response(200, "Données crées", res1);
    } catch (e) {
        resp = new Response(0, "Creation echouée")
    }
    return resp;
}

const getCreatedFormations = async (id) => {
    let resp;

    try {
        const res1 = await prisma.formation.findMany({
            where: {
                AuthorId: parseInt(id)
            }
        })
        resp = new DataResponse(200, "Data recuperee", res1)
    } catch (e) {
        resp = new Response(0, "Data non recuperee");
    }
    return resp;
}

const Reset = async () => {
    let result = true
    Object.values(Tables).forEach(async (value) => {
        const tab = identifyTable(value);
        try {
            const res = await tab.deleteMany({})
        }
        catch (e) { return new Response(0, "Echec") }
    })
    return new Response(200, "Data reset")
}

const GetNbLikes = async (id) => {
    let resp;

    try {
        const res1 = await prisma.like.findMany({
            where: {
                FormationId: parseInt(id)
            }
        })
        resp = new DataResponse(200, "Data recuperee", res1.length)
    } catch (e) {
        resp = new Response(0, "Data non recuperee");
    }
    return resp;
}

const GetLikedFormations = async (id) => {
    let resp;
    let data = []
    try {
        const res1 = await prisma.like.findMany({
            where: {
                AuthorId: parseInt(id)
            }
        })
        for (let i = 0; i < res1.length; i++) {
            let res2 = await prisma.formation.findUnique({
                where: {
                    Id: res1[i].FormationId
                }
            })
            data.push(res2);
        }
        
        data = Array.from(new Set(data))
        console.log(JSON.stringify(data))
        resp = new DataResponse(200, "Data recuperee", data)
    } catch (e) {
        resp = new Response(0, "Data non recuperee");
    }
    data = Array.from(new Set(data))
    console.log(JSON.stringify(data))
    return resp;
}

const getFollowedFormations = async (id) => {
    let resp;
    let data = []
    try {
        const res1 = await prisma.statutUtilisateurFormation.findMany({
            where: {
                UserId: parseInt(id)   
            }
        })
        for (let i = 0; i < res1.length; i++) {
            const res2 = await prisma.formation.findMany({where:{
                Id: res1[i].FormationId
            }})
            data.push(res2)
        }
        
        data = Array.from(new Set(data))
        console.log(JSON.stringify(data))
        resp = new DataResponse(200, "Data recuperee", data)
    } catch (e) {
        resp = new Response(0, "Data non recuperee");
    }
    return resp;
}
const GetCompletedContent = async(id) => {
    let resp;
    let data = [];
    try {
        const res1 = await prisma.statutUtilisateurLecon.findMany({
            where: {
                UserId: parseInt(id)
            }
        })
        for (let i = 0; i < res1.length; i++) {
            console.log(res1[i])
            data.push(res1[i])
        }
        const res2 = await prisma.statutUtilisateurQuizz.findMany({
            where:{
                UserId: parseInt(id)
            }
        })
        for (let i = 0; i < res2.length; i++) {
            console.log(res2[i])
            data.push(res2[i])
        }
        resp = new DataResponse(200, "Data recuperee", data)
    } catch (e) {
        resp = new Response(0, e);
    }
    return resp;
}
const PostFormation = async(Formation,Lessons) =>{
    let resp;
    try {
        const result = await postSpecificRequest(Tables.Formation, Formation);
        const FormationId = result.data.Id

        for (let i = 0; i < Lessons.length; i++){
            if (!Lessons[i].isQuizz) {
                const tmpLesson = {
                    FormationId: FormationId,
                    Titre: Lessons[i].title,
                    Contenu: Lessons[i].content
                }
                await postSpecificRequest(Tables.Lesson, tmpLesson);
            }
            else {
                const tmpQuizz = {
                    FormationId: FormationId,
                    Titre: Lessons[i].title,
                    Description: ""
                }
                const result2 = await postSpecificRequest(Tables.Quizz, tmpQuizz);
                const QuizzId = result2.data.Id;
                const Questions = Lessons[i].content.questions

                for (let j = 0; j < Questions.length; j++) {
                    const tmpQuestion = {
                        QuizzId: QuizzId,
                        Enonce : Questions[j].title
                    }
                    const result3 = await postSpecificRequest(Tables.Question,tmpQuestion);
                    const QuestionId = result3.data.Id;
                    const Reponses = Questions[j].answers;
                    
                    for (let k = 0;k<Reponses.length;k++){
                        
                        console.log("oe")
                        const tmpReponse = {
                            QuestionId: QuestionId,
                            Right: Reponses[k].isCorrect,
                            Contenu : Reponses[k].title
                        }
                        let res = await postSpecificRequest(Tables.Response,tmpReponse);
                        console.log(res)
                    }
                }
            }
            }
        resp = new DataResponse(200,"Formation bien upload");
    } catch (e) {
        resp= new Response(0,"Formation non upload , errr :" + JSON.stringify(e))
    }
    return resp;
}

const putFormation = async(id,Formation,Lessons) =>{
    let resp = new Response(200,"Modification réussie")
    try{
    await clearFormation(id,Lessons)
    
    await prisma.formation.update({
        where:{
            Id: id
        },
        data: Formation 
    })
    
    // Appel fonction postFormation bis
    await postFormationBis(id,Lessons);
    }
    catch(err){
        throw new Error("Modification non réussie")
    }
    return resp;
}

const clearFormation = async(id,Lessons) => {
    await prisma.lecon.deleteMany({
        where:{
            FormationId: id
        }
    });
    for (let i = 0; i < Lessons.length; i++){
        if (Lessons[i].isQuizz) {
            const QuizzId = Lessons[i].Id;
            const Questions = Lessons[i].content.questions

            for (let j = 0; j < Questions.length; j++) {
                const QuestionId = Questions[j].Id;
                
                    await prisma.response.deleteMany({
                        where:{
                            QuestionId: QuestionId
                        }
                    })
            }
            await prisma.question.deleteMany({
                where:{
                    QuizzId: QuizzId
                }
            })
        }
    }
    await prisma.quizz.deleteMany({
        where:{
         FormationId: id   
        }
    })
}

const postFormationBis = async(FormationId,Lessons) =>{
        for (let i = 0; i < Lessons.length; i++){
            if (!Lessons[i].isQuizz) {
                const tmpLesson = {
                    FormationId: FormationId,
                    Titre: Lessons[i].title,
                    Contenu: Lessons[i].content
                }
                await postSpecificRequest(Tables.Lesson, tmpLesson);
            }
            else {
                const tmpQuizz = {
                    FormationId: FormationId,
                    Titre: Lessons[i].title,
                    Description : ""
                }
                const result2 = await postSpecificRequest(Tables.Quizz, tmpQuizz);
                const QuizzId = result2.data.Id;
                const Questions = Lessons[i].content.questions;

                for (let j = 0; j < Questions.length; j++) {
                    const tmpQuestion = {
                        QuizzId: QuizzId,
                        Enonce : Questions[j].title
                    }
                    const result3 = await postSpecificRequest(Tables.Question,tmpQuestion);
                    const QuestionId = result3.data.Id;
                    const Reponses = Questions[j].answers;
                    
                    for (let k = 0;k<Reponses.length;k++){
                        
                        console.log("oe")
                        const tmpReponse = {
                            QuestionId: QuestionId,
                            Right: Reponses[k].isCorrect,
                            Contenu : Reponses[k].title
                        }
                        let res = await postSpecificRequest(Tables.Response,tmpReponse);
                        console.log(res)
                    }
                }
            }
            }
}
module.exports = {
    getAllRequest,
    getSpecificRequest,
    postSpecificRequest,
    deleteSpecific,
    deleteAll,
    putSpecific,
    CheckisComplete,
    PutisComplete,
    initContent,
    GetContent,
    GetQuizz,
    GetQuizzFormation,
    CreateQuizz,
    getCreatedFormations, Reset, GetNbLikes, GetLikedFormations,
    getFollowedFormations,GetCompletedContent,PostFormation,putFormation
}