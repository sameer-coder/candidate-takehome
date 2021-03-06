const express = require('express');
const bodyParser = require('body-parser');
const { Op } = require("sequelize");
const db = require('./models');
const topGames = require('./top_games.json');


const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/static`));

app.get('/api/games', (req, res) => db.Game.findAll()
  .then(games => res.send(games))
  .catch((err) => {
    console.log('There was an error querying games', JSON.stringify(err));
    return res.send(err);
  }));

app.post('/api/games', (req, res) => {
  const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
  return db.Game.create({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished })
    .then(game => res.send(game))
    .catch((err) => {
      console.log('***There was an error creating a game', JSON.stringify(err));
      return res.status(400).send(err);
    });
});

app.delete('/api/games/:id', (req, res) => {
  // eslint-disable-next-line radix
  const id = parseInt(req.params.id);
  return db.Game.findByPk(id)
    .then(game => game.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting game', JSON.stringify(err));
      res.status(400).send(err);
    });
});

app.put('/api/games/:id', (req, res) => {
  // eslint-disable-next-line radix
  const id = parseInt(req.params.id);
  return db.Game.findByPk(id)
    .then((game) => {
      const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = req.body;
      return game.update({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished })
        .then(() => res.send(game))
        .catch((err) => {
          console.log('***Error updating game', JSON.stringify(err));
          res.status(400).send(err);
        });
    });
});

app.post('/api/games/search', (req, res) => {
  const { name, platform } = req.body;
  let whereQuery = {};
  // If one of the parameters is missing
  if((name && !platform) ||(!name && platform)) {
    const errResult = {status:"ERROR", msg:"Missing mandatory parameter"};
    return res.status(400).json(errResult);
  }

  if((name && platform)) {
    whereQuery = {
      where: {
        name: { [Op.like]: '%' + name + '%' },
        platform: { [Op.eq]: platform }
      }
    }
  }

  return db.Game.findAll(whereQuery)
  .then(game => res.send(game))
  .catch((err) => {
    console.log('***There was an error searching for the game', JSON.stringify(err));
    return res.status(400).send(err);
  });
});


app.post('/api/games/populate', (req, res) => {
  for (const game of topGames) {
    const { publisherId, name, platform, storeId, bundleId, appVersion, isPublished } = game;
    db.Game.create({ publisherId, name, platform, storeId, bundleId, appVersion, isPublished })
    .catch((err) => {
      console.log('***There was an error creating a game', JSON.stringify(err));
      return res.status(400).send(err);
    });
  }
  return res.send({status:"Success", msg:"All Games populated"})
});


app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

module.exports = app;
