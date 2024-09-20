const asyncHandler = (requesHandler) => {
   return (res, req, next) => {
        Promise.resolve(requesHandler(req, res, next)).catch((err)=> next(err))
    }
}




export {asyncHandler}


// const asyncHandler = (fn) => async (req,res,next) => {
//     try{
//          await fn(req,res,next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success: false,
//             massage: err.message
//         })
//     }
// }