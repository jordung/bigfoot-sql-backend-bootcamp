const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  add = async (req, res) => {
    const sighting = req.body;
    const sightingDetails = await this.model.create({
      ...sighting,
    });

    // send back single sighting
    res.json({ sighting: sightingDetails, message: "Success" });
  };

  delete = async (req, res) => {
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
}

module.exports = SightingsController;
