const Tables = {
    Like : "Likes",
    Comment : "Comment",
    Response : 'Response',
    Question : 'Question',
    Quizz : 'Quizz',
    Lesson : 'Lesson',
    StatutLesson : "StatutLesson",
    StatutQuizz : "StatutQuizz",
    StatutFormation : "StatutFormation",
    Formation : 'Formation',
    User : 'User'
}
const Identificators = {
    Id : 'Id',
    Name : 'Name',
    Lecon : {
        Id : 'LeconId',
        Action : 'isRead',
        IdTitle : 'UserId_LeconId'
    },
    Quizz : {
        Id : 'QuizzId',
        Action : 'isSuccessful',
        IdTitle : "UserId_QuizzId"
    },
    Formation : {
        Id : 'FormationId',
        Action : 'isCompleted',
        IdTitle : 'UserId_FormationId'
    },
    Question: {
        Id : 'QuestionId'
    }
}

module.exports = {Tables,Identificators}