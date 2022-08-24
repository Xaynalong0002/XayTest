let express = require('express');
let app = express.Router(); 

let parcel = [];

//generate list function
function generateList() {
   let st = 'Id  |   Sender  |  Address  | Weight  |  Fragile </br>';
   for (let i = 0; i < parcel.length; i++) {
       st += parcel[i].id + ' | ' + parcel[i].sender + ' | ' + parcel[i].address + 
       ' | ' + parcel[i].weight + ' | ' + parcel[i].fragile +'</br>';
   }
   return st;
}

//Home page
app.get('/', function(req, res){
   res.send(`<h1> Welcome to Post Office Management System `);
});

//Add parcel
app.get('/addparcel', function(req, res){ //string query
   let newParcel = {
      id: Math.round(Math.random() * 1000),
      sender: req.query.sender,
      address: req.query.address,
      weight: parseFloat(req.query.weight),
      fragile: req.query.fragile,
   };

   parcel.push(newParcel);
   res.send(generateList());
});

//Get Parcels
app.get('/getparcels', function(req, res){
   res.send(generateList());
});

//Delete Parcels
app.get('/deleteid/:id', function(req, res){ //use params
   for(let i = 0; i < parcel.length; i++){
      if(parcel[i].id === parseInt(req.params.id)){ 
         parcel.splice(i, 1); 
      }
   }

   res.send(generateList());

});

//Get total weight of the parcel
app.get('/gettotalweight', function(req, res){
   let sum = 0;
   for(let i = 0; i < parcel.length; i++){
      sum += parcel[i].weight;
   }

   res.send("The total weight is " + sum);

});

//extra task 
app.get('/fragileparcels', function(req, res){
   let msg = 'Fragile Parcels: <br/>';
   for(let i = 0; i < parcel.length; i++){
      if(parcel[i].fragile === 'true'){
         msg += parcel[i].id + '<br/>';
      }
   }

   res.send(msg); 


});

module.exports = app;


/*
   http://localhost:8080/
   http://localhost:8080/addparcel?sender=Harry&address=Melbourne&weight=1.5&fragile=false
   http://localhost:8080/getparcels
   http://localhost:8080/deleteid/938
   http://localhost:8080/gettotalweight

*/