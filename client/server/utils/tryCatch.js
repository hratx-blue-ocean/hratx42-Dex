module.exports = function(cb, res){
    try{
        cb()
    } catch(error){
        res.status(500).send("Something went wrong")
    }
}