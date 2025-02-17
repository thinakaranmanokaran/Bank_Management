const { Project } = require("./../../models/Admin");

exports.projectAdd = async (req, res) => {
  try {
    const { title, description, price, relation, stack, img, code, link } =
      req.body;

    const project = await Project.create({
      title,
      description,
      price,
      relation,
      stack,
      img,
      code,
      link,
    });
    res
      .status(201)
      .json({ success: true, message: "Project added successfully", project });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.projectGet = async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from MongoDB
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
}