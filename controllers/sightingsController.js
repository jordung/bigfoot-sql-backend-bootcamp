const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel, sightingCategoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
    this.sightingCategoryModel = sightingCategoryModel;
  }

  listAll = async (req, res) => {
    try {
      console.log(this.sightingCategoryModel);
      const sightings = await this.model.findAll({
        include: this.categoryModel,
      });
      return res.json({ sightings: sightings, message: "Success" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  add = async (req, res) => {
    const { date, location, notes, category } = req.body;
    console.log(category);
    const newSighting = await this.model.create({
      date: new Date(date),
      location: location,
      notes: notes,
    });

    await newSighting.setCategories(category);

    // send back single sighting
    res.json({ sighting: newSighting, message: "Success" });
  };

  delete = async (req, res) => {
    await this.sightingCategoryModel.destroy({
      where: {
        sightingId: req.params.id,
      },
    });

    await this.model.destroy({
      where: {
        id: req.params.id,
      },
    });
    let data = await this.model.findAll();
    res.json({ sightings: data, message: "success" });
  };

  edit = async (req, res) => {
    const sighting = req.body;
    await this.model.update(
      { ...sighting },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const updatedSighting = await this.model.findByPk(req.params.id);
    res.json({ sighting: updatedSighting, message: "Success" });
  };

  listComments = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: { sightingId: sightingId },
      });
      return res.json({ comments: comments, message: "Success" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  postComment = async (req, res) => {
    const { content } = req.body;
    const { sightingId } = req.params;
    const newComment = await this.commentModel.create({
      content: content,
      sighting_id: sightingId,
    });
    res.json(newComment);
  };

  getCategory = async (req, res) => {
    try {
      const category = await this.categoryModel.findAll();
      return res.json({ data: category, message: "Success" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = SightingsController;
