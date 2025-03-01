const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");
const { get } = require("http");


app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

//Index Route
app.get("/chats", async(req, res) =>{
    let chats = await chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});

// new route 
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//create route 
app.post("/chats",(req,res)=>{
    let{from, to, msg} = req.body;
    let newChat = new chat({
        from: from,
        to: to,
        msg : msg,
        created_at : new Date(),
    });

    newChat
    .save()
    .then((res) =>{
        console.log("chat was saved");
    })

    res.redirect("/chats");
});


//edit route 
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await chat.findById(id);
    res.render("edit.ejs",{chat});
});

// update route 
app.put("/chats/:id", async(req,res) =>{
    let{id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await chat.findByIdAndUpdate(
        id,
        {msg: newMsg},
        {runValidators:true, new:true}
    );
    res.redirect("/chats");
})

//DESTORY ROUTE
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deletechat = await chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.listen(8080,()=>{
    console.log("server is listening at port 8080");
})

app.get("/",(req,res) =>{
    res.send("root is working");
})

