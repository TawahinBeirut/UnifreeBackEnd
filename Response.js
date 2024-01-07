
class Response {
    constructor(Statut,Message){
        this.Statut = Statut;
        this.Message = Message
    }
}
class DataResponse extends Response{
    constructor(Statut,Message,data){
        super(Statut,Message)
        this.data = data
    }
}

module.exports = {Response,DataResponse}