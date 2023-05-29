const express = require('express');

const app = express()
const Arena = require('bull-arena')
const Bull= require('bull');
const { Redis_port, Redis_host } = require('../config/constant');

const arenaConfig = Arena({
  Bull,
  queues: [
    {
      type: 'bull',

      // Name of the bull queue, this name must match up exactly with what you've defined in bull.
      name: "NewsQueue",
      

      // Hostname or queue prefix, you can put whatever you want.
      hostId: "NewsQueue",

      // Redis auth.
      redis: {
        port: Redis_port,
        host:Redis_host,
        
      }
    },
    {
      type: 'bull',

      // Name of the bull queue, this name must match up exactly with what you've defined in bull.
      name: "feedQueue",
      

      // Hostname or queue prefix, you can put whatever you want.
      hostId: "feedQueue",

      // Redis auth.
      redis: {
        port: Redis_port,
        host:Redis_host,
        
      }
    },
    {
      type: 'bull',

      // Name of the bull queue, this name must match up exactly with what you've defined in bull.
      name:"channelQueue",
      

      // Hostname or queue prefix, you can put whatever you want.
      hostId: "channelQueue",

      // Redis auth.
      redis: {
        port: Redis_port,
        host:Redis_host,
        
      }
    },

  ],

  
  // Make the arena dashboard become available at {my-site.com}/arena.
  basePath: '/arena',

  // Let express handle the listening.
  disableListen: true,
});

// Make arena's resources (js/css deps) available at the base app route
module.exports = arenaConfig