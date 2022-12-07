const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');

//router.get('/checklists', (req, res) => {
router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', { checklists: checklists })
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Error displaying the lists'})
    }
});

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('/checklists/new', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error loading the form' })
    }
})

//Utilizando o post
router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({name});
    try {
        //let checklist = await Checklist.create({ name });
        await checklist.save();
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).render('checklists/new', { checklist: { ...checklist, error} });
    }
});

//Parâmetro nas rotas
router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', { checklist: checklist })
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Error displaying the task lists'})
    }
});

//Rota PUT(para atualizar)
router.put('/:id', async (req, res) => {
    let { name } = req.body;
    try {
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, {new: true}); // sempre que desejar passar o cara que for atualizado, utilizar o {new:true}
        res.status(200).json(checklist);
    } catch (error) {
        res.status(200).render('pages/error', {error: 'Error displaying the tasks list'})
    }
});

//Rota DELETE(p/deletar coisas do servidor)
router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).json(checklist);
    } catch (error) {
        res.status(422).json(error);
    }
});

module.exports = router;
