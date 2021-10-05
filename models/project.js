const { Schema, model } = require("mongoose");

const ProjectSchema = Schema({
  display: {
    type: URL,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = model("Project", ProjectSchema);
