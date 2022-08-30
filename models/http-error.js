class HttpError extends Error {
    constructor(message,errorCode){
        super(message)//Add the message property
        this.error = errorCode//Add status property
    }
}
module.exports = HttpError;