//
// REST services My TV plan proyect
//
// 31/3/2021
// 
//  Specifications given by the professors of the Subject of 
//  "Service and Proccess Programming" San Vicente Institute
//
// proposal of the student Gregorio Solis Perez

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/videos',
    { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.set('useFindAndModify', false);  //recommended by Moongose
//
// Schema definition
//            
let today = new Date();
let videoSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        trim: true,
        require: true
    },
    type: {
        type: String,
        trim: true,
        requiere: true,
        enum: ['movie', 'series', 'mini-series']
    },
    platform: {
        type: String,
        trim: true,
        require: true,
        enum: ['Netflix', 'HBO', 'Disney+', 'TV']
    },
    category: {
        type: String,
        trim: true,
        require: true,
        enum: ['comedy', 'thriller', 'adventures', 'other']
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5
    },
    limitDate: {
        type: Date
        // min: today // in real situation it should be activated.  for testing is disabled
    }
});

let Video = mongoose.model('video', videoSchema);

let app = express();
app.use(bodyParser.json());

console.log("SERVER: 'myplantv-services' was turned ON");
///////////////////////////////////////////////////////////////////////
//
// Used in FIRST CHARGE
//

let now = new Date();
someday = new Date();
someday.setFullYear(2021, 4, 14);
console.log ("--------------------------------------dia ",now.getDate());
//
let video1 = new Video ( {
    title : "Star Wars 9",
    type : "movie",
    platform : "Netflix",
    category : "adventures",
    rating : 4,
    limitDate : someday.setFullYear(2021,0,1)
} );
video1.save()
    .then (result =>{
        console.log ("ok:",result);
    })
    .catch( error =>{
        console.log ("error:",error);
    } );
    someday.setFullYear(2021, 2, 14);
let video2 = new Video ( {
        title : "Star Wars 10",
        type : "movie",
        platform : "Netflix",
        category : "adventures",
        rating : 4,
        limitDate : someday.setFullYear(2021,1,1)
    } );
video2.save()
        .then (result =>{
            console.log ("ok:",result);
        })
        .catch( error =>{
            console.log ("error:",error);
        } );
        someday.setFullYear(2021, 4, 6);
let video3 = new Video ( {
            title : "Star Wars 11",
            type : "movie",
            platform : "Netflix",
            category : "adventures",
            rating : 4,
            limitDate : someday.setFullYear (2021,2,6)
        } );
video3.save()
            .then (result =>{
                console.log ("ok:",result);
            })
            .catch( error =>{
                console.log ("error:",error);
            } );
            someday.setFullYear(2021, 2, 5);
let video4 = new Video ( {
                title : "Star Wars 12",
                type : "movie",
                platform : "Netflix",
                category : "adventures",
                rating : 4,
                limitDate : someday.setFullYear(2021,3,6)
            } );
video4.save()
                .then (result =>{
                    console.log ("ok:",result);
                })
                .catch( error =>{
                    console.log ("error:",error);
                } );

//
///////////////////////////////////////////////////////////////////////
//
//                          SERVICES's definition
//
///////////////////////////////////////////////////////////////////////
//
//      (GET) /videos
// 
// get all
//
app.get('/videos', (req, res) => {
    Video.find().then(result => {
        if (result.length > 0) {
            let data = { ok: true, result: result };
            res.send(data);
        } else {
            let data = { ok: false, errorMessage: "No videos were found" };
            res.send(data);
        }
    })
	.catch(error => {
        let data = { ok: false, errorMessage: "No Videos" };
        res.send(data);
    });
});
//
///////////////////////////////////////////////////////////////////////
//
//      (GET) /videos/type/:type
//
// get all videos for a given type
// 
app.get('/videos/type/:type', (req, res) => {
    Video.find({ type: req.params.type }).then(result => {
        if (result.length > 0) {
            let data = { ok: true, result: result };
            res.send(data);
        } else {
            let data = {
                ok: false, errorMessage: "No videos in the "
                    + req.params.type + " type were found"
            };
            res.send(data);
        }
    }).catch(error => {
        let data = { ok: false, errorMessage: "Error getting video by type" };
        res.send(data);
    });
});
//
///////////////////////////////////////////////////////////////////////
//
//      (GET) /videos/platform/:platform
//
// get all videos for a given platform
// 
app.get('/videos/platform/:platform', (req, res) => {
    Video.find({ platform: req.params.platform }).then(result => {
        if (result.length > 0) {
            let data = { ok: true, result: result };
            res.send(data);
        } else {
            let data = {
                ok: false, errorMessage: "No videos in the "
                    + req.params.platform + " platform were found"
            };
            res.send(data);
        }
    }).catch(error => {
        let data = { ok: false, errorMessage: "Error getting video by type" };
        res.send(data);
    });
});
//
///////////////////////////////////////////////////////////////////////
//
//      (GET) /videos/category/:category
//
// get all videos for a given category
// 
app.get('/videos/categories/:category', (req, res) => {
    Video.find({ category: req.params.category })
        .then(result => {
            if (result.length > 0) {
                let data = { ok: true, result: result };
                res.send(data);
            } else {
                let data = {
                    ok: false, errorMessage: "No videos in the "
                        + req.params.category + " category were found"
                };
                res.send(data);
            }
        })
        .catch(error => {
            let data = { ok: false, errorMessage: "Error getting video by type" };
            res.send(data);
        });
});
//
///////////////////////////////////////////////////////////////////////
//
//      (GET) /videos/rating/:rating
//
// get all videos for a given rating
// 
app.get('/videos/rating/:points', (req, res) => {
    Video.find({ rating: req.params.points })
        .then(result => {
            if (result.length > 0) {
                let data = { ok: true, result: result };
                res.send(data);
            } else {
                let data = {
                    ok: false, errorMessage: "No videos with "
                        + req.params.points + " rating were found"
                };
                res.send(data);
            }
        })
        .catch(error => {
            let data = { ok: false, errorMessage: "Error getting video by type" };
            res.send(data);
        });
});
//
///////////////////////////////////////////////////////////////////////
//
//      (POST) /videos
// Insert one video
//
app.post('/videos', (req, res) => {
    let newVideo = new Video({
        title: req.body.title,
        type: req.body.type,
        platform: req.body.platform,
        category: req.body.category,
        rating: req.body.rating,
        limitDate: req.body.limitDate
    });
    newVideo.save().then(result => {
        let data = { ok: true, result: result };
        res.send(data);
    }).catch(error => {
        let data = {
            ok: false,
            errorMessage: "Error adding video"
        };
        res.send(data);
    });
});
//
///////////////////////////////////////////////////////////////////////
//
//      (PUT) /videos/:id
//  modify video's attribute identified by id
//
app.put('/videos/:id', (req, res) => {
    Video.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            type: req.body.type,
            platform: req.body.platform,
            category: req.body.category,
            rating: req.body.rating,
            limitDate: req.body.limitDate
        }
    }, { new: true }).then(result => {
        let data = { ok: true, result: result };
        res.send(data);
    }).catch(error => {
        let data = { ok: false, errorMessage: "Error updating video" };
        res.send(data);
    });
});
//
///////////////////////////////////////////////////////////////////////
//
//      (DELETE) /videos/:id
//  delete by a video.  id given
//
app.delete('/videos/:id', (req, res) => {
    Video.findByIdAndRemove(req.params.id).then(result => {
        let data = { ok: true, result: result };
        res.send(data);
    }).catch(error => {
        let data = { ok: false, errorMessage: "Error removing video" };
        res.send(data);
    });
});
//
///////////////////////////////////////////////////////////////////////
//
//      (GET) /videos/date
//
// get all videos not expired 
// 
app.get('/videos/date', (req, res) => {
    Video.find().then(result => {
        if (result.length > 0) {
            let now = Date.now();
            let active = filterActive(result)
            let data = { ok: true, result: active };
            res.send(data);
        } else {
            let data = { ok: false, errorMessage: "No videos were found" };
            res.send(data);
        }
    }).catch(error => {
        let data = { ok: false, errorMessage: "No Videos" };
        res.send(data);
    });
});
//
//  Find active videos and sorted by limitDate ascending
//
function filterActive(videoList) {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    let filter = videoList.filter(function (video) { return (video.limitDate >= today); });
    let sorted = filter.sort(function (v1, v2) { return v1.limitDate - v2.limitDate });
    //console.log(sorted);
    return sorted;
}
//
//
///////////////////////////////////////////////////////////////////////
//
//  Awake lisening
//
console.log("listening requests....");
