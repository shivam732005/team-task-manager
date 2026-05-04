const mongoose = require("mongoose");
const Project = require("../server/models/Project");

module.exports = async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);

  if (req.method === "GET") {
    const data = await Project.find();
    return res.json(data);
  }

  if (req.method === "POST") {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description: description || ""
    });

    return res.json(project);
  }
};