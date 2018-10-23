const Answer = require('../models/answers')
const Question = require('../models/questions')

class Controller {
    static create(req,res){
        console.log('masuk ke answer controller =====')
        if (!req.body.description || req.body.description.length === 0) {
            res.status(500).json({message: 'Cannot post empty answer'})
        }else{
            Answer.create({
                description : req.body.description,
                author : req.userData._id //ini diambil dari hasil cek token di middleware
            })
            .then((result)=>{
                console.log('masuk ke result')
                Question.findOneAndUpdate({
                    _id : req.params.id
                },{
                    $push : {
                        answers : result._id
                    }
                })
                .then((response)=>{
                    res.status(201).json(response)
                })
                .catch((err)=>{
                    res.status(500).json({
                        message : 'failed to post answer'
                    })
                })
                
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'comment failed'
                })
            })
        }
    }

    static read(req,res){
        
    }

    static readOne(req,res){

    }

    static delete(req,res){
        myComment.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(200).json({
                message : 'delete success'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'delete failed',
                err : err
            })
        })
    }

}

module.exports = Controller;