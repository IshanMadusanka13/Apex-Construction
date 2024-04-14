import cusPackageBuyModel from "../models/CusPackageBuy";
import logger from '../utils/logger.js'

export function createCusPackage(req, res) {
    const {
      name,
      price,
      description,
      duration,
      cost,
      cusId,
      isApproved,
    } = req.body;
    const newCusPackage = new cusPackageBuyModel({
      name: name,
      price: price,
      description: description,
      duration: duration,
      cost: cost,
      cusId:cusId,
      isApproved:isApproved,
    });
    newCusPackage
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        logger.error(err);
        res.status(500).json({ message: "Error creating package" });
      });
  }