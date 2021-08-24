'use strict';


const Food=(sequelize,DataTypes)=>sequelize.define('Food',{
    name:{
        type: DataTypes.STRING,
        allownull: false,
    },
});

// function getFoodHandler(req,res){
//     let output = {
//         name: req.query.name}
//         res.status(200).json(output);

// }

module.exports=Food;