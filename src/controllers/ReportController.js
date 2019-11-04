const { Op } = require('sequelize');

const User = require("../models/User");

module.exports = {
  async show(req, res) {
    // Encontrar todos os usuários que o email termina com @rocketseat.com.br
    // Desses usuários eu quero buscar todos que moram na rua "Rua Guilherme Gambala"
    // Desses eu quero buscar as tecnologias que começam com react

    const users = await User.findAll({
      attributes: ["name", "email"],
      where: {
        email: {
          [Op.iLike]: '%@gmail.com'
        }
      },
      include: [
        { association: "addresses", where: { street: "Rua Vergínio Marchezini" } }, // ENDEREÇOS
        { 
          association: "techs", 
          required: false,  
          where: {
            name: {
              [Op.iLike]: "react%"
            }
          } }, // TECNOLOGIAS
      ]
    });

    return res.json(users)
  }
};