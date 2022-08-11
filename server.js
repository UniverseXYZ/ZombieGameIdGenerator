const express = require('express');
const app = express();
const { request } = require('graphql-request');
const path = require('path');
const polyMorphQueries = require('./private/queries/polyMorphQueries');
const server = require('http').Server(app);
const port = process.env.PORT || 1313;
const mongooseService = require('./private/mongoose/mongoose.service');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
})

app.use('/static', express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

app.get('/getId', async (req, res) => {
  try {
    const { account } = req.query;
    const query = polyMorphQueries.getPolyMorphsQuery;
    const polyMorphsV1 = await request(process.env.THE_GRAPH_URL, query, {
      walletAddress: account
    });
    const polyMorphsV2 = await request(process.env.THE_GRAPH_V2_URL, query, {
      walletAddress: account
    });

    if (polyMorphsV1.transferEntities.length > 0 || polyMorphsV2.transferEntities.length > 0) {
      const user = await mongooseService.updateUser(account);
      res.json({
        id: user.id,
      });
    } else {
      res.status(406).send({
        error: 'You do not have a polymorph!',
      });
    }
  } catch (e) {
    res.status(500).send({
      error: 'Connection error!',
    });
  }
});
