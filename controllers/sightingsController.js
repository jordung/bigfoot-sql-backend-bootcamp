const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
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
}

module.exports = SightingsController;
