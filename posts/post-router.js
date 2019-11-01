const express = require("express");

// database access using knex
const Posts = require("../data/db-helpers.js");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(() =>
      res.status(500).send({ errorMessage: "Could not access database" })
    );
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(() => {
      res
        .status(500)
        .send({ errorMessage: "Could not find Post with that Id" });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .send("Title and Contents must be included to create a post.");
  } else {
    Posts.insert({ title: title, contents: contents })
      .then(posts => {
        res.status(201).json({ posts });
      })
      .catch(() =>
        res
          .status(500)
          .send({ errorMessage: "Could not add Post to database." })
      );
  }
});

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .send("Title and Contents must be included to update a post.");
  } else {
    Posts.update(req.params.id, { title: title, contents: contents })
      .then(posts => {
        res.status(202).json({ posts });
      })
      .catch(() => {
        res.status(500).send({ errorMessage: "Could not update that Post." });
      });
  }
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(posts => {
      res.status(202).json({ posts });
    })
    .catch(() => {
      res.status(500).send({ errorMessage: "Could not remove that Post." });
    });
});

module.exports = router;
