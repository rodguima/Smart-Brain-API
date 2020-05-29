const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '9fa9084c93ed4c1d8b5de326000edee1'
 });

 const handleApiCall = (req, res) => {
   app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work ith API'))
 }

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries  => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
  }

  module.exports = {
    handleImage,
    handleApiCall
  }