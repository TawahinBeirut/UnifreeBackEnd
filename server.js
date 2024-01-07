// Imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const {Response,DataResponse} = require('./Response.js');


const FormationsRouter = require('./Routers/FormationsRouter.js');
const Auth  = require('./utiles/authmiddleware');
const {Reset} = require('./genericRequests.js')


// Definition des Routeurs
// const AuthRouter = express.Router()
const UsersRouter = require('./Routers/UsersRouter.js')
const CommentsRouter = require('./Routers/CommentsRouter.js')
const LikesRouter = require('./Routers/LikesRouter.js')

const LessonsRouter = require('./Routers/LessonsRouter.js');
const QuizzRouter = require('./Routers/QuizzRouter.js');
const QuestionsRouter = require('./Routers/QuestionsRouter.js');
const ResponseRouter = require('./Routers/ResponseRouter.js');

const app = express();

app.use(express.json());
app.use(cors());

// Attribution des routeurs
app.use('/Users',UsersRouter);
app.use('/Formations',FormationsRouter);
app.use('/Comments',CommentsRouter);
app.use('/Likes',LikesRouter);
app.use('/Lessons', LessonsRouter);
app.use('/Quizz', QuizzRouter);
app.use('/Questions', QuestionsRouter);
app.use('/Responses', ResponseRouter);


app.get('/',(req, res) => {
    console.log(`yes`)
    res.json({"GET": "GEt"})
})

app.delete('/Reset', async (req,res) => {
    Reset()
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
})

app.listen(process.env.PORT,() => {
    console.log('Listening ... in port ' + process.env.PORT)
})