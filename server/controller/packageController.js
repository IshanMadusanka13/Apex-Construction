import packageModel from "../models/Package.js";
import logger from '../utils/logger.js'

//insert new package into database
export function createPackage(req, res) {
  const {
    name,
    price,
    description,
    duration,
    homeImage,
    modelLink,
    cost,
  } = req.body;
  const newPackage = new packageModel({
    name: name,
    price: price,
    description: description,
    homeImage: homeImage,
    modelLink: modelLink,
    duration: duration,
    cost: cost,
  });
  newPackage
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).json({ message: "Error creating package" });
    });
}

//update existing package if user have  package in privileges by id
export function updatePackage(req, res) {
  const {
    name,
    price,
    description,
    duration,
    homeImage,
    modelLink,
    cost,
  } = req.body;

  packageModel
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: name,
          price: price,
          description: description,
          duration: duration,
          homeImage: homeImage,
          cost: cost
        },
      }
    )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating package" });
    });
}

//delete existing package by id
export function deletePackage(req, res) {
  packageModel
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      logger.info(err);
      res.status(500).json({ message: "Error deleting package" });
    });
}

export function getAllPackages(req, res) {
  packageModel
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting packages" });
    });
}

//get package by id if user have package in privileges
export function getPackageById(req, res) {
  packageModel
    .findOne({ _id: req.params.id })
    // packageModel.find({_id : req.query.id})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting package" });
    });
}
