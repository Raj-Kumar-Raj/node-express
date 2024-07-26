const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err =>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    {
    from:"ruhi",
    to:"preeti",
    msg:"send the notes please",
    created_at : new Date(),
},

{ 
     from:"raj",
    to:"pandey",
    msg:"send the lecture video",
    created_at : new Date(),
},

{
    from:"ritesh",
    to:"priya",
    msg:"all the best1",
    created_at : new Date(),
}

];

chat.insertMany(allchats);
chat.deleteMany();
