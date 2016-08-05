

;(function(){

  const router = require('express').Router();
  const Planet = require('../models/planet-model')
  module.exports.mountPath = '/planets'
  module.exports.router = router;

  router.route('/:id?')
    .get(function(req, res){
      Planet.getAll(function(){
          res.send(data);
      });
    })
    .post(function(req, res){
       res.send(Planet.createPlanet(req.body.name, req.body.galaxyId))
    })
    .put(function(req, res){
      res.send('We are working on it....')
    })
    .delete(function(req, res){
      res.send('We are working on it....')
    })



}());