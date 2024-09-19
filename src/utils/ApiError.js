class ApiError extends Error{
    constructor(
        statusCode,
        message= "Somthing went wrong",
        errors= [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false;
        this.message = message
        this.errors  = errors
   
        // if(statck){
        //     this.stack = statck
   
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}


export {ApiError}