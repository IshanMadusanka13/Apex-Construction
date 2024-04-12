import express from "express";
import mongoose from "mongoose";
import siteSchema from "../models/Site.js";
import logger from "../utils/logger.js";
const siteModel = mongoose.model("site", siteSchema);


export function createSite(req, res) {
    //destruct req and create new siteModel in database
    const { siteId, location, start, end, notes, custId } = req.body;
    const newSite = new siteModel({
        custId: custId,
        siteId: siteId,
        location: location,
        start: start,
        end: end,
        notes: notes,
    });
    newSite
        .save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({ message: "Error creating site" });
        });
}

//get completed days for site / all days as a percentage by siteId
export function getCompletedDays(req, res) {

    //get site by id
    siteModel
        .findOne({ siteId: req.params.id })
        .then((result) => {
            //calculate percentage
            const completedDays = Math.round(
                ((new Date() - result.start) / (result.end - result.start)) * 100
            );
            res.send({ completedDays: completedDays });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting site" });
        });
}

//update end , note and siteState and note of a  site if user type is admin and have site in privileges
export function updateSite(req, res) {
    //destruct req and update siteModel in database
    const { location, siteId, siteState } = req.body;
    //update site by id
    siteModel
        .updateOne(
            { _id: req.params.id },
            {
                $set: {
                    location: location,
                    siteId: siteId,
                    siteState: siteState,
                }
            }
        )
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error updating site" });
        });
}

//delete site by id if user type is admin and have site in privileges
export function deleteSite(req, res) {
    //delete site by id
    siteModel
        .deleteOne({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error deleting site" });
        });
}

//get all sites if user type is admin and have site in privileges
export function getAllSites(req, res) {
    //get all sites
    siteModel
        .find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting sites" });
        });
}

// looged in customer can retieve all sites which have his _id as custId
export function getAllSitesByCustId(req, res) {
    //get all sites
    siteModel
        .find({ custId: req.logInfo.userObject._id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting sites" });
        });
}

export function createSiteFunction(data) {
    console.log(data)
    const { siteId, location, start, end, notes, custId } = data;
    let newSite = new siteModel({
        custId: custId,
        siteId: siteId,
        location: location,
        start: start,
        end: end,
        notes: notes,
    });
    return newSite
        .save()

}























































































