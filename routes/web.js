const express = require('express')
const JobController = require('../Controller/JobController')
const router = express.Router()


router.get('/getallJob',JobController.getallJob)
router.post('/registerJobs',JobController.registerJob)
router.post('/loginJobs',JobController.loginJob)









module.exports= router