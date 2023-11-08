const auth_model = require ('./auth-model')

function checkReqBodyUsernamePassword ( req, res, next ) {
    try{
        if(!req.body.username || !req.body.password){
            next({
                status:422,
                message:"username or password required"
            })
        }else{
            next()
        }
    }catch(err){
        next(err)
    }
}

async function checkUsernameNotTaken ( req, res, next ) {
    try{
        const username = await auth_model.findBy({username:req.body.username})

        if(!username.length){
            next()
        }else{
            next({
                status:422,
                message:"username taken"
            })
        }
    }catch(err){
        next(err)
    }
}


module.exports = {
    checkReqBodyUsernamePassword,
    checkUsernameNotTaken
}