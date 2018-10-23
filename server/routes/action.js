const router = require('express').Router()
const middleware = require('../middleware/middleware')

const upvoteController = require('../controllers/upvoteController')
const downvoteController = require('../controllers/downvoteController')

router.post('/upvotequestion/:id',middleware.authenticate,upvoteController.createQ)
router.post('/downvotequestion/:id',middleware.authenticate,downvoteController.createQ)
// router.delete('/:id',middleware.authenticate,answerController.delete)

// router.get('/',answerController.read)
// router.get('/:id',answerController.readOne)

module.exports = router;