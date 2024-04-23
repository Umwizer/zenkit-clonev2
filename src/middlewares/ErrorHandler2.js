const ErrorHandlerMiddleware  =(err,req,res,next) =>{
    const errStatus = err.statusCode || 500;
    const errMessage = err.message || "Internal Server Error";
if(err.name === 'ValidationError'){
errMessage = Object.values(err.errors)
.map(err => err.message)
.join(',');
errStatus = 400;
}
if(err.code && err.code === 11000){
    errMessage = `Duplicate value entered for ${Object.keys(err.values)}field,please choose another value`;
errStatus = 400;
}
if(err.name === 'Cast Error'){
    errMessage = `Invalid ${Object.keys(err.value)}`;
    errStatus = 404;
}
console.error(errMessage)
res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {}
})
};
export default ErrorHandlerMiddleware
