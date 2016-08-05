;(function(){

  const router = require('express').Router();
  const Star = require('../models/star-model');
let exports = module.exports = {};

  exports.mountPath = '/stars'
  exports.router = router;

  router.route('/:id?')
  .get(function(req,res){
      Star.getAll(function(data){
          res.send(data);
      });
  })
  .post(function(req, res){
      Star.createStar(req.body.name, req.body.galaxyId, function(star){
          return res.send(star);
      });
  })
  .put(function(req,res){
      res.send('We are working on it')
  })
  .delete(function(req,res){
      res.send('We are working on it')
  })

}());