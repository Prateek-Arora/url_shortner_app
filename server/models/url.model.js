const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    clicks: {
        type: Number,
        default: 0
    },
    uniqueVisitors: {
        type: Array,
        default: []
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  module.exports = Url = mongoose.model("urls", urlSchema);