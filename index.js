const express=require('express');
const path=require('path');   //inbuilt module no need to install
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();         //has all functionality of express


app.set('view engine','ejs');                 //to set ejs as view engine
app.set('views',path.join(__dirname,'views'));     //to tell where we are going to put views,  path.join()->d:/deepak/cn_practice/contactList/views
app.use(express.urlencoded());
app.use(express.static('assets',));

// //middleware1
// app.use(function(req,res,next){
//     console.log("middleware1 called");
//     next();
// });

// //middleware2
// app.use(function(req,res,next){
//     console.log("middleware2 called");
//     next();
// });

// var contactList=[
//     {
//         name:"Deepak",
//         phone:"9582728781"
//     },
//     {
//         name:"ABC",
//         phone:"1546516"
//     },
//     {
//         name:"xyz",
//         phone:"165365136"
//     }
// ]
app.get('/',function(req,res){                 //localhost:8000
    //console.log(req);
    // console.log(__dirname);                  //d:/deepak/cn_practice/contactList
    // res.send("<h1>It is runnning</h1>");
    Contact.find({},function(err,contacts){
        if(err)
        {
            console.log("Error in fetching");
            return;
        }
        return res.render('home',{
            title:"Contact",
            contact_List:contacts
        });
    });

    
});
// app.get('/practice',function(req,res){
//     return res.render('practice',{title:"lets play"});   //if it is last statement and you r rendering a 
                                                            //view or sending some response then it should return
// });

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // 
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err)
            {
                console.log('Errpr in runninh');
                return;
            }
            console.log('####',newContact);
            return res.redirect('back');
    });
    
});

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    // let phone=req.query.phone;
    let id=req.query.id;
    // let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
    // if(contactIndex!=-1)
    // {
    //     contactList.splice(contactIndex,1);
    // }
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in del");
            return;
        }
        return res.redirect('back');
    });
   
});

app.listen(port,function(err){
    if(err)
        console.log("Error",err);
    console.log("Express server is running on port:",port);
});