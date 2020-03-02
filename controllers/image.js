const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: YOUR_API_KEY
});

const handleApi = (req, res) => {
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input // 'https://samples.clarifai.com/face-det.jpg'
    )
    .then(data => res.json(data));
};

const handleEntries = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where({ id })
    .increment({
      entries: 1
    })
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => {
      res.status(400).json('Unable to get entries');
    });
};

module.exports = {
  handleEntries,
  handleApi
};
