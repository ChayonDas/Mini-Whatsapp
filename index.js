const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))

main().then((res) => {
  console.log("Conect to database");
})

  .catch(err => console.log(err));


async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

//index route
//index route
app.get("/chats", async (req, res) => {
  try {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//New Router...

app.get("/chats/new", (req, res) => {
   res.render("new.ejs");
})


//create route

app.post("/chats",(req,res)=>{
  let {from,to,msg}=req.body;
  let newChat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  })

newChat.save().then((res)=>{
    console.log("Data Saved");
}).catch((err)=>{
  console.log(err);
})
  res.redirect("/chats");
})

//Edit route

app.get("/chats/:id/edit",async(req,res)=>{
  try{let myId=req.params;
    let chat= await Chat.findById(myId.id);

    res.render("edit.ejs",{chat});}
  

  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

})

//Update Route

app.put("/chats/:id",async (req,res)=>{
   try{let id=req.params.id;
    let {msg:newMsg}=req.body; 
    console.log(newMsg); 
  
    let updatedChat=await Chat.findByIdAndUpdate(id, {msg:newMsg},{runValidators:true, new:true});
  
    console.log("Updated...") 
     res.redirect("/chats");
  } 
    
  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");} 

})

//Delete route

app.delete("/chats/:id", async (req, res) => {
  try {
    let id = req.params.id; // Extract the id property directly from req.params
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/", (req, res) => {
  res.send("root is working....");
})



const port = 8000;
app.listen(port, () => {
  console.log(`server is listing at the port${port}`);
})