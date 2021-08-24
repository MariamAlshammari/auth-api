'use strict';

const express = require('express');
// const dataModules = require('../models');
const dataModules = require('./models')
const router = express.Router();
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

const acl = require('./middleware/acl');

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    console.log('mode;;;;;;',modelName);
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model',bearerAuth, acl('read'),  handleGetAll);

router.get('/:model/:id',bearerAuth, acl('read'), handleGetOne);

router.post('/:model', handleCreate);

router.put('/:model/:id', handleUpdate);

router.patch('/:model/:id', bearerAuth, acl('update'), handleUpdate);

router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
    try{
  let allRecords = await req.model.findAll({});
  res.status(200).json(allRecords);}
  catch(err){
    throw new Error(err.message)
    // console.log('errr');
  }
}

async function handleGetOne(req, res) {
    try{
  const id = req.params.id;
  let theRecord = await req.model.findOne({ where: {id: id}  })
  res.status(200).json(theRecord);}
  catch(err){
    throw new Error(err.message)
  }
}

async function handleCreate(req, res) {
    try{
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);}
  catch(err){
    throw new Error(err.message)
  }
}

async function handleUpdate(req, res) {
    try{
  const id = req.params.id;
  const obj = req.body;
  let record = await req.model.findOne({ where: { id } });
  let updatedRecord = await record.update(obj)
  res.status(200).json(updatedRecord);}
  catch(err){
    throw new Error(err.message)
  }
}

async function handleDelete(req, res) {
    try{
  let id = req.params.id;
  let deletedRecord = await req.model.destroy({ where: { id } });
  res.status(200).json(deletedRecord);}
  catch(err){
    throw new Error(err.message)
  }
}


module.exports = router;


// const express = require('express');
// const router = express.Router();

// const { users } = require('./models/index.js');
// const basicAuth = require('./middleware/basic.js')
// const bearerAuth = require('./middleware/bearer.js')

// const acl = require('./middleware/acl');
// const dataModules = require('./models/index')



// router.post('/create', bearerAuth, acl('create'), (req, res) => {
//   res.status(200).send('Ok! I have create permissions');
// });

// router.put('/update', bearerAuth, acl('update'), (req, res) => {
//   res.status(200).send('Ok! I have update permissions');
// });

// router.delete('/delete', bearerAuth, acl('delete'), (req, res) => {
//   res.status(200).send('Ok! I have delete permissions');
// });

