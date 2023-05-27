const { set,connect,connection } = require('mongoose')
const { MongoDB_URI } = require('../config/constant')


function connectDatabase(){
    set('strictQuery',true);
    return connect(MongoDB_URI);
}


connection.on("connected",()=>{
    console.log("connection successfully")
})


module.exports = connectDatabase;