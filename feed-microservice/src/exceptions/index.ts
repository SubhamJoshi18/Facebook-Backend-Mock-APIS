import httpStatusCode from 'http-status-codes'

class HttpExceptions extends Error {

    public message : string
    public statusCode  : number

    constructor(message : string,statusCode=httpStatusCode.BAD_REQUEST){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.name = `Http Exceptions`
        Object.setPrototypeOf(this,new.target.prototype)
    }


    getMessage():string{
        return this.message
    }


    getStatusCode():number{
        return this.statusCode
    }

}


class DatabaseExceptions extends HttpExceptions {

    constructor(message : string){
        super(message)
        this.name = 'Database Exceptions'
        Object.setPrototypeOf(this,new.target.prototype)
    }
}


class ValidationExceptions extends HttpExceptions {

    constructor(message : string) {
        super(message)
        this.name = 'Validation Exceptions'
        Object.setPrototypeOf(this,new.target.prototype)
    }
}


class ConnectionExceptions extends HttpExceptions {

    constructor(message : string) {
        super(message)
        this.name = 'Connection Exceptions'
        Object.setPrototypeOf(this,new.target.prototype)
    }
}


export {
    HttpExceptions,
    DatabaseExceptions,
    ValidationExceptions,
    ConnectionExceptions
}


