const Temple = require('../Models/Temple');
const multer = require('multer');
const mongoose = require('mongoose');

const upload = require('../Middleware/Upload');


exports.index = async (req, res) => {
    const q = (req.query.q == undefined) ? '' : req.query.q;
    const temples = await Temple.find({title: { '$regex' : q, '$options' : 'i' }}).exec();
    res.render('temple/index', { temples: temples });
}

exports.new = (req, res) => {
    res.render('temple/create', { alert: req.flash('alert') });
}

exports.create = async (req, res) => {
    try {
        await upload(req, res);

        const pictures = [];
        req.files.forEach((value, index) => {
            pictures.push(value.filename);
        });

        const temple = new Temple({
            title: req.body.title,
            description: req.body.description,
            pictures: pictures
        });

        const saveTemple = await temple.save();

        if (saveTemple === temple) {
            req.flash('alert', {
                message: 'Temple has been saved!',
                status: 'success',
                title: 'Yay!'
            });
        } else {
            req.flash('alert', {
                message: 'Problem occurs when saving data!',
                status: 'danger',
                title: 'Ouch!'
            });
        }
    } catch (err) {
        req.flash('alert', {
            message: err,
            status: 'danger',
            title: 'Ouch!'
        });
    }
    res.redirect('/temple/create');
}

exports.show = async (req, res) => {
    let temple = await Temple.findById(req.params.templeId).exec();
    res.render('temple/show', { temple: temple });
}

exports.edit = async (req, res) => {
    let temple = await Temple.findById(req.params.templeId).exec();
    res.render('temple/edit', { temple: temple, alert: req.flash('alert') });
}

exports.update = async (req, res) => {
    try {
        await upload(req, res);

        console.log('body: ', req.body);

        const newPictures = [];
        req.files.forEach((value, index) => {
            newPictures.push(value.filename);
        });

        let temple = await Temple.findById(req.params.templeId).exec();
        console.log('old temple: ', temple);
        let oldPictures = temple.pictures;

        if (req.body.pictureToRemove != null && req.body.pictureToRemove != undefined) {
            if (Array.isArray(req.body.pictureToRemove)) {
                req.body.pictureToRemove.forEach((value, index) => {
                    picIndex = oldPictures.indexOf(value);
                    if (picIndex > -1) {
                        oldPictures.splice(picIndex, 1);
                    }
                });
            } else {
                picIndex = oldPictures.indexOf(req.body.pictureToRemove);
                if (picIndex > -1) {
                    oldPictures.splice(picIndex, 1);
                }
            }
        }

        console.log('old pic: ', oldPictures);

        let pictures = oldPictures.concat(newPictures);

        console.log('new pics: ', pictures);

        const newTemple = {
            title: req.body.title,
            description: req.body.description,
            pictures: pictures
        };

        const saveTemple = await temple.updateOne(newTemple);

        console.log('save temple: ', saveTemple);
        if (saveTemple.ok){
            req.flash('alert', {
                message: 'Temple has been saved!',
                status: 'success',
                title: 'Yay!'
            });
        } else {
            req.flash('alert', {
                message: 'Problem occurs when saving data!',
                status: 'danger',
                title: 'Ouch!'
            });
        }
    } catch (err) {
        req.flash('alert', {
            message: err.toString(),
            status: 'danger',
            title: 'Ouch!'
        });
    }
    res.redirect(`/temple/${req.params.templeId}/edit`);
}

exports.delete = (req, res) => {
    Temple.deleteOne({_id: req.params.templeId}, (err) => {
        if (err){
            req.flash('alert', {
                message: err.toString(),
                status: 'danger',
                title: 'Ouch!'
            });
            res.redirect(`/temple/${req.params.templeId}/edit`);
        }

        res.redirect('/');
    });
}