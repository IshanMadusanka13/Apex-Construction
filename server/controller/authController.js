import Auth from '../models/authModel.js';
import logger from "../utils/logger.js";

const getAuth = (req, res, next) => {
    Auth.find()
     .then(response => {
        res.json({ response })
     })
      .catch(error => {
        res.json({  error})
      });
};

const addAuth = (req,res,next) =>{
    const auth = new Auth ({
        id: req.body.id,
        localauthorityname: req.body.localauthorityname,
        type: req.body.type,
        city: req.body.city,
        place: req.body.place,
        nooffloors: req.body.nooffloors,
    });
    auth.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
};

const updateAuth = (req, res, next) => {
    const { id,localauthorityname,type,city,place,nooffloors } = req.body;
    Auth.updateOne({ id: id}, { $set: {localauthorityname: localauthorityname,type: type,city: city,place: place, nooffloors: nooffloors}})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
}

const deleteAuth = (req, res, next) => {
    const id = req.params.id;
    Auth.deleteOne({id: id})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
     
}

export default { getAuth, addAuth, updateAuth, deleteAuth };