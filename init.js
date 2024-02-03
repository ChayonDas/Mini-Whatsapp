const mongoose=require("mongoose");
const Chat = require("./models/chat");
main().then((res)=>{
    console.log("Conect to database");
})

.catch(err => console.log(err));


async function main(){

    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


let allChats=[{
    form:"Chayon",
    to:"Donkey",
    msg:"Who  is fools!!",
    created_at:new Date()
},

{
    form:"Ehayon",
    to:"Donkey",
    msg:"Who  is fools!!",
    created_at:new Date()
},
{
    form:"Dhayon",
    to:"Donkey",
    msg:"Who  is fools!!",
    created_at:new Date()
},
{
    form:"Bhayon",
    to:"Donkey",
    msg:"Who  is fools!!",
    created_at:new Date()
},

]

Chat.insertMany(allChats);

