
//
// Servicios para el funcionamiento
//
// Requiered modules
//
const mongoose =require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
//
//
let mensaje ="Wellcome to API ranking v1.2";
console.log (mensaje);
//
mongoose.Promise = global.Promise;
mongoose.connect ('mongodb://localhost:27017/ranking',
{useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.set ('useFindAndModify',false);  
//
//
//   Schema definition
//
let driverSchema = new mongoose.Schema({
    id: { 
        type: String,
        trim: true,
        requiere:true},
        // example "5f3a3c5f4984bd9be6a6f655",
    picture:{
        type: String
    }, // example "http://placehold.it/64x64",
    age : {type: Number}, // example 39,
    name : {type: String},// example"Valtteri Bottas",
    team: {type: String}, //example "Red Bull",
    races: [{circuit: String, time:String}]
        // array of example
       /* {
            "name": "GP Barein",
            "time": "1:16:53.224"
          },
          */
});

let Driver = mongoose.model('driver',driverSchema);
let app = express ();
app.use (bodyParser.json());

// get all / ranking
//
app.get ('/ranking', (req,res) =>{
    Driver.find().then(
        result => {
            if (result.length > 0)
                {  
                    totalProcess (result);
                    let data = { ok: true, result: result};
                    res.send(data);
                }
            else
                {  
                    let data = { ok: false, errorMessage: "not data found"};
                    res.send(data);
                }

        }
    )
    .catch (error => {
        let data = { ok :false, errorMessage: "functional error"};
        res.send(data);
    });
});


// get by original id
app.get ('/ranking/:idorig', (req,res) =>{
    Driver.find({id: req.params.idorig}).then(
        result => {
            if (result.length > 0)
                {  
                    totalProcess (result).catch(error=>{ console.log ("horrore");});
                    let data = { ok: true, result: result};
                    res.send(data);
                }
            else
                {  
                    let data = { ok: false, errorMessage: "not data found"};
                    res.send(data);
                }

        }
    )
    .catch (error => {
        let data = { ok :false, errorMessage: "functional error"};
        res.send(data);
    });
});

// get by original id
app.get ('/driver/:idorig', (req,res) =>{
    Driver.find({id: req.params.idorig}).then(
        result => {
            if (result.length > 0)
                {  
                    let data = { ok: true, result: result};
                    res.send(data);
                }
            else
                {  
                    let data = { ok: false, errorMessage: "not data found"};
                    res.send(data);
                }

        }
    )
    .catch (error => {
        let data = { ok :false, errorMessage: "functional error"};
        res.send(data);
    });
});

app.listen (8080);
console.log ("SERVER was turned on");

function totalProcess (fuente) {
    console.log ("a ppor conversion");
    
    var datos =" sencillo";
    console.log (fuente);
    return datos;
}