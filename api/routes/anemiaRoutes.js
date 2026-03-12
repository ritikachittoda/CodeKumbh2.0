const express = require("express");
const multer = require("multer");

const router = express.Router();

const { checkAnemia } = require("../controllers/anemiaController");

const upload = multer({ dest: "uploads/" });

router.post("/scan", upload.single("image"), checkAnemia);

module.exports = router;