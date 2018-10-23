const Answer = require('../models/answers')
const Question = require('../models/questions')

class Controller {
    static createQ(req,res){
        Question.findOneAndUpdate({
            _id : req.params.id
        },{
            $pull : {
                upvotes : req.userData._id,
                downvotes : req.userData._id
            }
        })
        .then((response)=>{
            Question.findOneAndUpdate({
                _id : req.params.id
            },{
                $push : {
                    upvotes : req.userData._id
                }
            })
            .then((response)=>{
                res.status(201).json({
                    message : 'upvote success'
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'failed to post answer'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'failed to post answer'
            })
        })
    }

    static createA(req,res){
        Answer.findOneAndUpdate({
            _id : req.params.id
        },{
            $pull : {
                upvotes : req.userData._id,
                downvotes : req.userData._id
            }
        })
        .then((response)=>{
            Question.findOneAndUpdate({
                _id : req.params.id
            },{
                $push : {
                    upvotes : req.userData._id
                }
            })
            .then((response)=>{
                res.status(201).json({
                    message : 'upvote success'
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'failed to post answer'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'failed to post answer'
            })
        })
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