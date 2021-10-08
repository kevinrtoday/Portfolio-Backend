const { model, Schema } = require("mongoose");

const ProjectSchema = Schema({
  name: {
    type: String,
    required: [true, "The name field is required"],
    unique: true,
  },

  description: {
    type: String,
  },
  img: { type: String },
});

module.exports = model("Project", ProjectSchema);
