const sharp = require("sharp");

const checkAnemia = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "Image required" });
  }

  try {

    const image = sharp(req.file.path);

    const { data, info } = await image
      .resize(50, 50)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;

    for (let i = 0; i < data.length; i += 3) {
      totalRed += data[i];
      totalGreen += data[i + 1];
      totalBlue += data[i + 2];
    }

    const pixelCount = info.width * info.height;

    const avgRed = totalRed / pixelCount;
    const avgGreen = totalGreen / pixelCount;
    const avgBlue = totalBlue / pixelCount;

    let risk = "Low";

    const rednessRatio = avgRed / ((avgGreen + avgBlue) / 2);

    if (rednessRatio < 0.9) {
      risk = "High";
    } else if (rednessRatio < 1.05) {
      risk = "Moderate";
    }

    res.json({
      risk,
      rednessRatio,
      color: {
        red: Math.round(avgRed),
        green: Math.round(avgGreen),
        blue: Math.round(avgBlue)
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image analysis failed" });
  }
};

module.exports = { checkAnemia };





// const express = require("express");
// const multer = require("multer");
// const sharp = require("sharp");

// const router = express.Router();

// const upload = multer({ dest: "uploads/" });

// router.post("/scan", upload.single("image"), async (req, res) => {

//   if (!req.file) {
//     return res.status(400).json({ error: "Image required" });
//   }

//   try {

//     const image = sharp(req.file.path);

//     const { data, info } = await image
//       .resize(50, 50)
//       .removeAlpha()
//       .raw()
//       .toBuffer({ resolveWithObject: true });

//     let totalRed = 0;
//     let totalGreen = 0;
//     let totalBlue = 0;

//     for (let i = 0; i < data.length; i += 3) {
//       totalRed += data[i];
//       totalGreen += data[i + 1];
//       totalBlue += data[i + 2];
//     }

//     const pixelCount = info.width * info.height;

//     const avgRed = totalRed / pixelCount;
//     const avgGreen = totalGreen / pixelCount;
//     const avgBlue = totalBlue / pixelCount;
// let risk = "Low";

// // compare redness relative to other colors
// const rednessRatio = avgRed / ((avgGreen + avgBlue) / 2);

// if (rednessRatio < 0.9) {
//   risk = "High";
// } else if (rednessRatio < 1.05) {
//   risk = "Moderate";
// }

//  res.json({
//   risk,
//   rednessRatio,
//   color: {
//     red: Math.round(avgRed),
//     green: Math.round(avgGreen),
//     blue: Math.round(avgBlue)
//   }
// });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Image analysis failed" });
//   }

// });

// module.exports = router;


