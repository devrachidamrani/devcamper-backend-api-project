const express = require("express")
const router = express.Router()

// Include other resources routers
const courseRouter = require("./courses.router")

const { protect, authorize } = require("../middlewares/auth")

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps.controllers")

const Bootcamp = require("../models/Bootcamp")
const advancedResults = require("../middlewares/advancedResults")

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter)

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp)
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp)

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)
router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload)

module.exports = router
