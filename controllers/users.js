const data = require("../data.json");

exports.home = function (req, res) {
  return res.render("users/home", { items: data.recipes });
};

exports.sobre = (req, res) => {
  return res.render("users/sobre");
};

exports.receitas = (req, res) => {
  return res.render("users/receitas", { items: data.recipes });
};

exports.receita = (req, res) => {
  const recipes = data.recipes;
  const recipeIndex = req.params.index;

  return res.render("users/receita", { receita: recipes[recipeIndex] });
};
