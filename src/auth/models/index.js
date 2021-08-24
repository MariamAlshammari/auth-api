'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const food=require('./food.model');
const clothes=require('./clothes.model');

const userSchema = require('./users.js');
const Collection = require('./collection-class');


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL || "postgres://postgres@localhost:5432/bearer";


const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
} : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const clothesModel = clothes(sequelize, DataTypes);
const foodModel = food(sequelize, DataTypes);

const clothesCollection = new Collection(clothesModel);
const foodCollection = new Collection(foodModel);
module.exports = {
  db: sequelize,
  Food:foodCollection,
  Clothes:clothesCollection,
  users: userSchema(sequelize, DataTypes),
};