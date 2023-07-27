const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.listAll);
    router.get("/category", this.controller.getCategory);
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.add);
    router.delete("/:id", this.controller.delete);
    router.put("/:id", this.controller.edit);
    router.get("/:sightingId/comments", this.controller.listComments);
    router.post("/:sightingId/comments", this.controller.postComment);
    return router;
  }
}

module.exports = SightingsRouter;
