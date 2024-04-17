import PackageAddon from "../models/packageAddon.js";

//insert new packageAddon into database if user have  package in privileges
export function createPackageAddon(req, res) {

    const { price, description, duration } = req.body;
    const newPackageAddon = new PackageAddon({
        
        price: price,
        description: description,
        duration: duration,
        
    });
    newPackageAddon
        .save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error creating packageAddon" });
        });
}

//update existing packageAddon if user have  package in privileges by id
export function updatePackageAddon(req, res) {

    const { id, price, description, duration } = req.body;
    //update packageAddon by id
    PackageAddon
        .updateOne(
            { _id: id },
            {
                $set: {
                    
                    price: price,
                    description: description,
                    duration: duration,
                    
                },
            }
        )
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error updating packageAddon" });
        });
}

//delete existing packageAddon if user have  package in privileges by id
export function deletePackageAddon(req, res) {
    //delete packageAddon by id
    PackageAddon
        .deleteOne({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error deleting packageAddon" });
        });
}

//get all packageAddons if user have  package in privileges
export function getAllPackageAddons(req, res) {

    //get all packageAddons
    PackageAddon
        .find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting packageAddons" });
        });
}

//get packageAddon by id if user have  package in privileges
export function getPackageAddonById(req, res) {

    //get packageAddon by id
    PackageAddon
        .findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting packageAddon" });
        });
}

// //get packageAddon by packageId
// export function getPackageAddonByPackageId(req, res) {
//     //get packageAddon by packageId
//     PackageAddon
//     .find({ packageId: req.params.id })
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         res.status(500).json({ message: "Error getting packageAddon" });
//     });
// }
