const auth = require('./auth');
const image = require('./image')

module.exports = app => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome to Flexxi Products API..." });
  });

  app.use('/api/v1/auth', auth); 
  app.use('/api/v1/image', image);
};
