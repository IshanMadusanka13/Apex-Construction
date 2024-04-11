const { response } = require('../app');
const User = require('../models/model'); // Correct casing



const getUsers = (req, res, next) => {
    User.find()
     .then(response => {
        res.json({ response })
     })
      .catch(error => {
        res.json({  error})
      });
};

const addUser = (req,res,next) =>{
    const user = new User ({
        id: req.body.id,
        feedback: req.body.feedback,
    });
    user.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
};

const updateUser = (req, res, next) => {
    const { id,feedback } = req.body;
    User.updateOne({ id: id}, { $set: {feedback: feedback}})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
}

const deleteUser = (req, res, next) => {
    const id = req.body.id;
    User.deleteOne({id: id})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
     
}



exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;