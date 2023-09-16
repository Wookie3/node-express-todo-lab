import express from "express";
const router = express.Router();
const items = [
  { id: 1, task: "buy groceries" },
  { id: 2, task: "clean room" },
  { id: 3, task: "take out the trash" },
];

router.get("/", (req, res) => {
  return res.json(items);
});

router.post("/", (req, res) => {
  const requiredProperties = ["id", "task"];
  let missingProperties = [];

  requiredProperties.forEach((prop) => {
    if (!req.body.hasOwnProperty(prop)) {
      missingProperties.push(prop);
    }
  });

  if (missingProperties.length) {
    let errorMessage = [];
    missingProperties.forEach((prop) => {
      errorMessage.push(`Missing property: ${prop}`);
    });
    return res.status(400).json({ errors: errorMessage });
  }
  items.push(req.body);
  return res.status(201).json(req.body);
});

// Individual Practice section:
// 1.
router.get("/:id", (req, res) => {
  return res.json(items.find((item) => item.id === parseInt(req.params.id)));
});
// 2.
router.put("/:id", (req, res) => {
  const requiredProps = ["id", "task"];
  let missingProperties = [];
  requiredProps.forEach((prop) => {
    if (!req.body.hasOwnProperty(prop)) {
      missingProperties.push(prop);
    }
  });
  if (missingProperties.length) {
    let errorMessage = ["Must include id and task. "];
    missingProperties.forEach((prop) => {
      errorMessage.push(`Missing property: ${prop}`);
    });
    return res.status(400).json({ errors: errorMessage });
  }

  const index = items.findIndex((item) => item.id === parseInt(req.params.id));
  if (!index) {
    return res
      .status(404)
      .json({ errors: `Task with ID ${req.params.id} was not found.` });
  }
  if (!req.path.includes(req.body.id)) {
    return res.status(400).send("bad request");
  }
  const item = items[index];
  item.task = req.body.task;
  return res.status(202).send("task updated");
});
// 3.
router.delete("/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === itemId);
  if (index === -1) {
    return res.status(404).send("task not found");
  }
  items.splice(index, 1);
  return res.status(204).send("task deleted");
});
// 4.
router.patch("/:id", (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === itemId);
  if (index === -1) {
    return res.status(404).send("task not found");
  }
  const item = items[index];
  if (!req.body.task) {
    return res.status(400).send("must enter task property");
  }
  item.task = req.body.task;
  return res.status(202).json(item);
});
export default router;
