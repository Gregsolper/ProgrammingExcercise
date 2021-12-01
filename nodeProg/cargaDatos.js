
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
let mensaje ="hola";
console.log (mensaje);
//
mongoose.Promise = global.Promise;
mongoose.connect ('mongodb://localhost:27017/ranking',
    { useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.set ('useFindAndModify',false);  
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
////////////////////////////////////////////
let driver0  = new  Driver ( {
    id : "5f3a3c5faa55d5c4ea549ac1",
    picture : "http://placehold.it/64x64",
    age : 38,
    name : "Lewis Hamilton",
    team : "Mercedes",
    races :  [  {circuit : "GP Barein", time : "1:11:39.515"},   {circuit : "GP Portugal", time : "1:17:24.312"},   {circuit : "GP Spain", time : "1:22:29.376"},   {circuit : "GP Monaco", time : "1:10:34.491"},   {circuit : "GP Italy", time : "1:51:45.103"},   {circuit : "GP Singapore", time : "1:44:16.158"},   {circuit : "GP Japan", time : "1:30:14.658"},   {circuit : "GP USA", time : "1:29:41.505"},   {circuit : "GP Australia", time : "1:47:52.109"},   {circuit : "GP Abu Dabi", time : "1:23:38.271"}]  
    } );
    driver0.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver1  = new  Driver ( {
    id : "5f3a3c5f4984bd9be6a6f655",
    picture : "http://placehold.it/64x64",
    age : 39,
    name : "Valtteri Bottas",
    team : "Red Bull",
    races :  [  {circuit : "GP Barein", time : "1:16:53.224"},   {circuit : "GP Portugal", time : "1:31:32.533"},   {circuit : "GP Spain", time : "1:26:56.186"},   {circuit : "GP Monaco", time : "1:0:15.169"},   {circuit : "GP Italy", time : "1:21:5.428"},   {circuit : "GP Singapore", time : "1:26:18.202"},   {circuit : "GP Japan", time : "1:22:24.379"},   {circuit : "GP USA", time : "1:22:9.316"},   {circuit : "GP Australia", time : "1:28:6.268"},   {circuit : "GP Abu Dabi", time : "1:57:56.461"}]  
    } );
    driver1.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver2  = new  Driver ( {
    id : "5f3a3c5fc4c1a2c2dd9df702",
    picture : "http://placehold.it/64x64",
    age : 39,
    name : "Sergio Pérez",
    team : "Red Bull",
    races :  [  {circuit : "GP Barein", time : "1:4:42.549"},   {circuit : "GP Portugal", time : "1:53:19.849"},   {circuit : "GP Spain", time : "1:51:25.667"},   {circuit : "GP Monaco", time : "1:58:26.847"},   {circuit : "GP Italy", time : "1:47:42.841"},   {circuit : "GP Singapore", time : "1:51:24.73"},   {circuit : "GP Japan", time : "1:4:0.075"},   {circuit : "GP USA", time : "1:52:40.457"},   {circuit : "GP Australia", time : "1:18:17.738"},   {circuit : "GP Abu Dabi", time : "1:37:35.128"}]  
    } );
    driver2.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver3  = new  Driver ( {
    id : "5f3a3c5f8a23c3e2c85cab74",
    picture : "http://placehold.it/64x64",
    age : 21,
    name : "Daniel Ricciardo",
    team : "Renault",
    races :  [  {circuit : "GP Barein", time : "1:21:48.956"},   {circuit : "GP Portugal", time : "1:0:56.521"},   {circuit : "GP Spain", time : "1:53:9.793"},   {circuit : "GP Monaco", time : "1:51:15.265"},   {circuit : "GP Italy", time : "1:59:43.968"},   {circuit : "GP Singapore", time : "1:31:27.167"},   {circuit : "GP Japan", time : "1:59:49.156"},   {circuit : "GP USA", time : "1:18:49.836"},   {circuit : "GP Australia", time : "1:47:46.692"},   {circuit : "GP Abu Dabi", time : "1:10:57.173"}]  
    } );
    driver3.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver4  = new  Driver ( {
    id : "5f3a3c5f355a5be1fb74076a",
    picture : "http://placehold.it/64x64",
    age : 28,
    name : "Lando Norris",
    team : "Renault",
    races :  [  {circuit : "GP Barein", time : "1:48:32.99"},   {circuit : "GP Portugal", time : "1:1:41.043"},   {circuit : "GP Spain", time : "1:22:57.229"},   {circuit : "GP Monaco", time : "1:4:40.618"},   {circuit : "GP Italy", time : "1:43:28.734"},   {circuit : "GP Singapore", time : "1:59:19.861"},   {circuit : "GP Japan", time : "1:16:19.976"},   {circuit : "GP USA", time : "1:28:39.612"},   {circuit : "GP Australia", time : "1:23:2.596"},   {circuit : "GP Abu Dabi", time : "1:38:32.305"}]  
    } );
    driver4.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver5  = new  Driver ( {
    id : "5f3a3c5fc42b87fc0d6e31a9",
    picture : "http://placehold.it/64x64",
    age : 27,
    name : "Sebastian Vettel",
    team : "McLaren",
    races :  [  {circuit : "GP Barein", time : "1:38:45.622"},   {circuit : "GP Portugal", time : "1:11:14.969"},   {circuit : "GP Spain", time : "1:46:46.861"},   {circuit : "GP Monaco", time : "1:44:18.84"},   {circuit : "GP Italy", time : "1:42:3.761"},   {circuit : "GP Singapore", time : "1:25:17.811"},   {circuit : "GP Japan", time : "1:12:57.672"},   {circuit : "GP USA", time : "1:55:48.879"},   {circuit : "GP Australia", time : "1:34:55.445"},   {circuit : "GP Abu Dabi", time : "1:58:25.125"}]  
    } );
    driver5.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver6  = new  Driver ( {
    id : "5f3a3c5f86cbcda872a8f1ed",
    picture : "http://placehold.it/64x64",
    age : 24,
    name : "Lance Stroll",
    team : "Ferrari",
    races :  [  {circuit : "GP Barein", time : "1:26:39.47"},   {circuit : "GP Portugal", time : "1:8:11.491"},   {circuit : "GP Spain", time : "1:50:5.416"},   {circuit : "GP Monaco", time : "1:48:56.726"},   {circuit : "GP Italy", time : "1:17:8.218"},   {circuit : "GP Singapore", time : "1:26:42.32"},   {circuit : "GP Japan", time : "1:55:43.729"},   {circuit : "GP USA", time : "1:6:13.931"},   {circuit : "GP Australia", time : "1:48:25.087"},   {circuit : "GP Abu Dabi", time : "1:52:38.604"}]  
    } );
    driver6.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver7  = new  Driver ( {
    id : "5f3a3c5f65e328c1a1263781",
    picture : "http://placehold.it/64x64",
    age : 29,
    name : "Fernando Alonso",
    team : "Ferrari",
    races :  [  {circuit : "GP Barein", time : "1:46:20.667"},   {circuit : "GP Portugal", time : "1:25:48.31"},   {circuit : "GP Spain", time : "1:0:26.598"},   {circuit : "GP Monaco", time : "1:40:54.377"},   {circuit : "GP Italy", time : "1:53:38.533"},   {circuit : "GP Singapore", time : "1:27:11.601"},   {circuit : "GP Japan", time : "1:20:27.344"},   {circuit : "GP USA", time : "1:48:58.123"},   {circuit : "GP Australia", time : "1:56:35.634"},   {circuit : "GP Abu Dabi", time : "1:47:46.822"}]  
    } );
    driver7.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver8  = new  Driver ( {
    id : "5f3a3c5fde8d2bb91cab3352",
    picture : "http://placehold.it/64x64",
    age : 31,
    name : "Esteban Ocon",
    team : "Williams",
    races :  [  {circuit : "GP Barein", time : "1:46:21.421"},   {circuit : "GP Portugal", time : "1:43:5.956"},   {circuit : "GP Spain", time : "1:27:27.411"},   {circuit : "GP Monaco", time : "1:32:43.108"},   {circuit : "GP Italy", time : "1:51:21.313"},   {circuit : "GP Singapore", time : "1:23:48.083"},   {circuit : "GP Japan", time : "1:6:0.916"},   {circuit : "GP USA", time : "1:57:54.609"},   {circuit : "GP Australia", time : "1:54:32.003"},   {circuit : "GP Abu Dabi", time : "1:31:15.369"}]  
    } );
    driver8.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver9  = new  Driver ( {
    id : "5f3a3c5f5a4ce67633e028ad",
    picture : "http://placehold.it/64x64",
    age : 29,
    name : "Charles Leclerc",
    team : "McLaren",
    races :  [  {circuit : "GP Barein", time : "1:16:52.691"},   {circuit : "GP Portugal", time : "1:20:32.393"},   {circuit : "GP Spain", time : "1:35:38.871"},   {circuit : "GP Monaco", time : "1:35:16.146"},   {circuit : "GP Italy", time : "1:41:49.539"},   {circuit : "GP Singapore", time : "1:57:46.918"},   {circuit : "GP Japan", time : "1:12:47.641"},   {circuit : "GP USA", time : "1:55:52.599"},   {circuit : "GP Australia", time : "1:26:36.246"},   {circuit : "GP Abu Dabi", time : "1:22:26.748"}]  
    } );
    driver9.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver10  = new  Driver ( {
    id : "5f3a3c5f0e202f4a527bf502",
    picture : "http://placehold.it/64x64",
    age : 27,
    name : "Carlos Sainz Jr.",
    team : "Mercedes",
    races :  [  {circuit : "GP Barein", time : "1:47:3.23"},   {circuit : "GP Portugal", time : "1:28:54.578"},   {circuit : "GP Spain", time : "1:40:5.387"},   {circuit : "GP Monaco", time : "1:28:49.392"},   {circuit : "GP Italy", time : "1:47:18.89"},   {circuit : "GP Singapore", time : "1:11:2.444"},   {circuit : "GP Japan", time : "1:22:29.818"},   {circuit : "GP USA", time : "1:4:24.429"},   {circuit : "GP Australia", time : "1:14:15.846"},   {circuit : "GP Abu Dabi", time : "1:39:5.08"}]  
    } );
    driver10.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver11  = new  Driver ( {
    id : "5f3a3c5ff1c5e552442b292d",
    picture : "http://placehold.it/64x64",
    age : 29,
    name : "Pierre Gasly",
    team : "Red Bull",
    races :  [  {circuit : "GP Barein", time : "1:44:36.643"},   {circuit : "GP Portugal", time : "1:15:9.451"},   {circuit : "GP Spain", time : "1:50:37.69"},   {circuit : "GP Monaco", time : "1:8:31.728"},   {circuit : "GP Italy", time : "1:32:50.154"},   {circuit : "GP Singapore", time : "1:51:22.663"},   {circuit : "GP Japan", time : "1:30:35.122"},   {circuit : "GP USA", time : "1:17:25.795"},   {circuit : "GP Australia", time : "1:36:56.224"},   {circuit : "GP Abu Dabi", time : "1:32:52.749"}]  
    } );
    driver11.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver12  = new  Driver ( {
    id : "5f3a3c5f086b43d06ac5a984",
    picture : "http://placehold.it/64x64",
    age : 35,
    name : "Yuki Tsunoda",
    team : "Ferrari",
    races :  [  {circuit : "GP Barein", time : "1:22:53.242"},   {circuit : "GP Portugal", time : "1:54:8.187"},   {circuit : "GP Spain", time : "1:1:5.747"},   {circuit : "GP Monaco", time : "1:44:13.98"},   {circuit : "GP Italy", time : "1:30:28.754"},   {circuit : "GP Singapore", time : "1:13:14.073"},   {circuit : "GP Japan", time : "1:41:58.781"},   {circuit : "GP USA", time : "1:8:10.042"},   {circuit : "GP Australia", time : "1:54:42.966"},   {circuit : "GP Abu Dabi", time : "1:58:35.652"}]  
    } );
    driver12.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver13  = new  Driver ( {
    id : "5f3a3c5f2744fa89349fe0f3",
    picture : "http://placehold.it/64x64",
    age : 34,
    name : "Kimi Räikkönen",
    team : "McLaren",
    races :  [  {circuit : "GP Barein", time : "1:8:15.559"},   {circuit : "GP Portugal", time : "1:50:21.71"},   {circuit : "GP Spain", time : "1:4:55.952"},   {circuit : "GP Monaco", time : "1:34:18.34"},   {circuit : "GP Italy", time : "1:59:9.568"},   {circuit : "GP Singapore", time : "1:59:42.241"},   {circuit : "GP Japan", time : "1:46:33.387"},   {circuit : "GP USA", time : "1:55:49.791"},   {circuit : "GP Australia", time : "1:29:4.4"},   {circuit : "GP Abu Dabi", time : "1:45:37.349"}]  
    } );
    driver13.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver14  = new  Driver ( {
    id : "5f3a3c5f970bc40e21b8ee63",
    picture : "http://placehold.it/64x64",
    age : 27,
    name : "Antonio Giovinazzi",
    team : "McLaren",
    races :  [  {circuit : "GP Barein", time : "1:19:38.374"},   {circuit : "GP Portugal", time : "1:52:42.372"},   {circuit : "GP Spain", time : "1:59:9.399"},   {circuit : "GP Monaco", time : "1:33:33.531"},   {circuit : "GP Italy", time : "1:15:15.002"},   {circuit : "GP Singapore", time : "1:12:1.19"},   {circuit : "GP Japan", time : "1:56:48.602"},   {circuit : "GP USA", time : "1:49:20.073"},   {circuit : "GP Australia", time : "1:53:21.555"},   {circuit : "GP Abu Dabi", time : "1:40:52.086"}]  
    } );
    driver14.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver15  = new  Driver ( {
    id : "5f3a3c5f0a5f78c603fc1d14",
    picture : "http://placehold.it/64x64",
    age : 30,
    name : "Nikita Mazepin",
    team : "Renault",
    races :  [  {circuit : "GP Barein", time : "1:39:54.655"},   {circuit : "GP Portugal", time : "1:26:8.059"},   {circuit : "GP Spain", time : "1:23:11.046"},   {circuit : "GP Monaco", time : "1:41:4.32"},   {circuit : "GP Italy", time : "1:9:53.404"},   {circuit : "GP Singapore", time : "1:13:42.517"},   {circuit : "GP Japan", time : "1:48:18.026"},   {circuit : "GP USA", time : "1:55:3.198"},   {circuit : "GP Australia", time : "1:19:46.733"},   {circuit : "GP Abu Dabi", time : "1:40:17.202"}]  
    } );
    driver15.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver16  = new  Driver ( {
    id : "5f3a3c5f876488cda4de309a",
    picture : "http://placehold.it/64x64",
    age : 32,
    name : "Mick Schumacher",
    team : "Honda",
    races :  [  {circuit : "GP Barein", time : "1:10:20.58"},   {circuit : "GP Portugal", time : "1:53:44.181"},   {circuit : "GP Spain", time : "1:5:18.992"},   {circuit : "GP Monaco", time : "1:47:55.459"},   {circuit : "GP Italy", time : "1:49:31.585"},   {circuit : "GP Singapore", time : "1:38:20.841"},   {circuit : "GP Japan", time : "1:48:19.814"},   {circuit : "GP USA", time : "1:36:18.023"},   {circuit : "GP Australia", time : "1:31:21.812"},   {circuit : "GP Abu Dabi", time : "1:48:26.514"}]  
    } );
    driver16.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver17  = new  Driver ( {
    id : "5f3a3c5f8bd0087dc1b70b77",
    picture : "http://placehold.it/64x64",
    age : 39,
    name : "Nicholas Latifi",
    team : "Williams",
    races :  [  {circuit : "GP Barein", time : "1:53:0.702"},   {circuit : "GP Portugal", time : "1:28:42.037"},   {circuit : "GP Spain", time : "1:53:24.687"},   {circuit : "GP Monaco", time : "1:38:10.498"},   {circuit : "GP Italy", time : "1:46:58.467"},   {circuit : "GP Singapore", time : "1:21:51.764"},   {circuit : "GP Japan", time : "1:2:8.072"},   {circuit : "GP USA", time : "1:26:54.026"},   {circuit : "GP Australia", time : "1:56:31.087"},   {circuit : "GP Abu Dabi", time : "1:56:5.192"}]  
    } );
    driver17.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver18  = new  Driver ( {
    id : "5f3a3c5f8df3fe2e8c6ae477",
    picture : "http://placehold.it/64x64",
    age : 29,
    name : "George Russell",
    team : "Honda",
    races :  [  {circuit : "GP Barein", time : "1:0:57.037"},   {circuit : "GP Portugal", time : "1:19:21.263"},   {circuit : "GP Spain", time : "1:16:58.378"},   {circuit : "GP Monaco", time : "1:21:1.485"},   {circuit : "GP Italy", time : "1:16:2.04"},   {circuit : "GP Singapore", time : "1:50:30.417"},   {circuit : "GP Japan", time : "1:54:33.324"},   {circuit : "GP USA", time : "1:15:45.267"},   {circuit : "GP Australia", time : "1:2:42.528"},   {circuit : "GP Abu Dabi", time : "1:24:7.128"}]  
    } );
    driver18.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver19  = new  Driver ( {
    id : "5f3a3c5f0c713e786503e798",
    picture : "http://placehold.it/64x64",
    age : 39,
    name : "Max Verstappen",
    team : "Williams",
    races :  [  {circuit : "GP Barein", time : "1:47:32.432"},   {circuit : "GP Portugal", time : "1:40:12.872"},   {circuit : "GP Spain", time : "1:44:7.808"},   {circuit : "GP Monaco", time : "1:47:10.399"},   {circuit : "GP Italy", time : "1:16:48.487"},   {circuit : "GP Singapore", time : "1:35:58.714"},   {circuit : "GP Japan", time : "1:9:2.596"},   {circuit : "GP USA", time : "1:58:10.066"},   {circuit : "GP Australia", time : "1:10:34.986"},   {circuit : "GP Abu Dabi", time : "1:11:36.368"}]  
    } );
    driver19.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver20  = new  Driver ( {
    id : "5f3a3c5f37ce779261434517",
    picture : "http://placehold.it/64x64",
    age : 24,
    name : "Miki Villar",
    team : "Everis Centers",
    races :  [  {circuit : "GP Barein", time : "1:48:28.477"},   {circuit : "GP Portugal", time : "1:37:16.852"},   {circuit : "GP Spain", time : "1:7:36.766"},   {circuit : "GP Monaco", time : "1:54:50.18"},   {circuit : "GP Italy", time : "1:11:35.705"},   {circuit : "GP Singapore", time : "1:1:52.361"},   {circuit : "GP Japan", time : "1:15:58.031"},   {circuit : "GP USA", time : "1:49:1.957"},   {circuit : "GP Australia", time : "1:50:46.778"},   {circuit : "GP Abu Dabi", time : "1:2:21.754"}]  
    } );
    driver20.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    let driver21  = new  Driver ( {
    id : "5f3a3c5fdc6f6738e4f35dd7",
    picture : "http://placehold.it/64x64",
    age : 32,
    name : "Benito Camela",
    team : "Everis Centers",
    races :  [  {circuit : "GP Barein", time : "1:53:36.228"},   {circuit : "GP Portugal", time : "1:59:58.061"},   {circuit : "GP Spain", time : "1:27:19.038"},   {circuit : "GP Monaco", time : "1:0:6.003"},   {circuit : "GP Italy", time : "1:6:38.885"},   {circuit : "GP Singapore", time : "1:50:42.074"},   {circuit : "GP Japan", time : "1:42:55.71"},   {circuit : "GP USA", time : "1:38:16.095"},   {circuit : "GP Australia", time : "1:56:0.979"},   {circuit : "GP Abu Dabi", time : "1:29:18.093"}]  
    } );
    driver21.save() 
    .then ( result=> {console.log("ok:",result);})
    .catch (error=>{console.log("error:",error);});
    
    

console.log ("SERVER was turned on")