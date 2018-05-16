var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');





const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/pics4wordsDB', function() {
  console.log("DB connection established!!!");
})

// Requirements to Models 
var Day = require('./models/dayModel');
var Comment = require('./models/commentModel');
var Image = require('./models/commentModel');

 

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// var image = new Image({
//    url: '\1526374347174.jpg',
//    user: 'David',
//    rating: 5,
//    comments: []
  
//   })
// image.save();


// You will need to create 5 server routes
// These will define your API:

//1) to handle getting all photos and their comments

     app.get('/days',function (req, res){
                    
          Day.find(function (req, day){
             res.send(day);
          })
     })


//2) to handle getting a specific Date

    app.get('/days:date',function (req, res){
                        
        var date = req.params.date;
        Day.find({day : date}, function (req, day){
           res.send(day);
        })
    })



//3) to handle deleting an Image

     app.delete('/delete/:day/images:id', function (req,res){
    
        var id = req.params.id;
            
        Image.find({ _id: id}, (req,res) =>{
          console.log(res)
        })
        
        Image.remove({ _id : id}, function(err, res1){
           if(err)
             res.send("failed")
           else{
            
            console.log ("removed")
            res.send("Deleted")
           }
        })
  })   

     



// 2) to handle adding a post

//   app.post('/posts',function (req,res){

//       var newPost = new Post(req.body)
      
//       newPost.save(function (err, respond){
//         if(err)
//             res.send("failed")
//         else{
//           res.send({id: respond.id, text:"Saved"})
//         }
//       })

//   })



// 4) to handle adding a comment to a post

    // app.post("/posts/:id/comments", function (req, res){
    //   id = req.params.id;
    //   newComment = {text: req.body.text, user: req.body.user}
    //   Post.findByIdAndUpdate(id, {
    //     $push: { comments: newComment }
    //   }, { 'new': true}, function (err, res1){
    //           if(err)
    //             res.send("failed")
    //           else {  
    //             var comId = res1.comments[res1.comments.length-1]._id
    //             res.send({id: comId, text:"Updated"}) 
                
    //           }})

    //   });



     

    

  
// 5) to handle deleting a comment from a post

        // app.delete("/posts/del-comment/:id/:idC", function (req, res){
           
        //     id = req.params.id;
        //     idC = req.params.idC;
            
        //     Post.update({ _id: id},{$pull: { comments : {_id : idC} } },function (err, res1) {
        //     if(err)
        //       res.send("failed")
        //     else    
        //       res.send("Deleted")
        //     })
        // });


//Function used to configure the middleware storage
var storage = multer.diskStorage({
  destination: function(req, file, callback){
      callback(null, './public/uploads'); // set the destination
  },
  filename: function(req, file, callback){
      
      callback(null, Date.now() + '.jpg'); // set the file name and extension
  }
});
var upload = multer({storage: storage});

app.post('/add', upload.single('imagename'), function(req, res, next) {
  console.log("updating photo ////")
  
  var image = req.file.filename;
  var img = new Image()
  img.url = image;
  img.user = req.title // ???
  img.save(function (err, respond){
    if(err)
        res.send("failed")
    else{
      res.send("Saved")
    }
  })
 /** rest */ 
});




app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
