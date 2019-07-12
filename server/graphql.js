var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

function graphqlMiddleware() {
  var app = express();

  var schema = buildSchema(`
    type Movie {
      id: String!
      manifest: String
      name: String
    }

    type Query {
      movie(id: String): Movie
      movies: [Movie]
    }
  `);

  var movies = {
    '1': {
      id: '1',
      manifest: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
      name: 'Star Trek',
    },
    '2': {
      id: '2',
      manifest: 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd',
      name: 'Sintel',
    },
    '3': {
      id: '3',
      manifest: 'https://www-itec.uni-klu.ac.at/ftp/datasets/DASHDataset2014/TheSwissAccount/15sec/TheSwissAccount_15s_onDemand_2014_05_09.mpd',
      name: 'The swiss account',
    },
    '4': {
        id: '4',
        manifest: 'https://storage.googleapis.com/shaka-demo-assets/tos-surround/dash.mpd',
        name: 'Tears of steel'
    },
      '5': {
        id: '5',
        manifest: 'https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd',
        name: 'Big buck bunny'
      },
      '6': {
        id: '6',
        manifest: 'https://www-itec.uni-klu.ac.at/ftp/datasets/DASHDataset2014/ElephantsDream/15sec/ElephantsDream_15s_onDemand_2014_05_09.mpd',
        name: 'Elephant dream'
      },
      '7': {
        id: '7',
        manifest: 'https://www-itec.uni-klu.ac.at/ftp/datasets/DASHDataset2014/OfForestAndMen/15sec/OfForestAndMen_15s_onDemand_2014_05_09.mpd',
        name: 'Forest man'
      },
      '8': {
        id: '8',
        manifest: 'https://www-itec.uni-klu.ac.at/ftp/datasets/DASHDataset2014/Valkaama/15sec/Valkaama_15s_onDemand_2014_05_09.mpd',
        name: 'Valkaama'
      },
      '9': {
        id: '9',
        manifest: 'https://www-itec.uni-klu.ac.at/ftp/datasets/DASHDataset2014/RedBullPlayStreets/15sec/RedBull_15s_onDemand_2014_05_09.mpd',
        name: 'Redbull playstreet'
      }
  };

  var rootValue = {
    movie({ id }) {
      return movies[id];
    },
    movies() {
      return Object.values(movies);
    },
  };

  app.use(graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }));

  return app;
}

module.exports = exports = graphqlMiddleware;