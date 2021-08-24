'use strict';


const Clothes=(sequelize,DataTypes)=>sequelize.define('Clothes',{
    clothesType:{
        type: DataTypes.STRING,
        allownull: false,
    },
});



module.exports=Clothes;