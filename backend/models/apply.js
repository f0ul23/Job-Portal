const mongoose = require('mongoose');

const apply = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    post: {
        type: String,
        required: true,
    },
    resume :{
        type: String,
        required: true,
    }
  }, { timestamps: true });

  
  const Apply = mongoose.model("Apply", apply);
  
  module.exports = Apply;
  