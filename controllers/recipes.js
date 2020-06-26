const fs = require("fs");
const data = require("../data.json");

//apenas mostra a página index de listagem das receitas
exports.index = function (req, res) {
  return res.render("admin/index", { recipes: data.recipes });
};

//apenas mostra a pagina de criação
exports.create = function (req, res) {
  return res.render("admin/create");
};

//realmente permite criar a receita
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, write in all filds before send");
    }
  }

  let {
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
  } = req.body;

  if (data.recipes[0] == undefined) {
    lastId = 0;
  } else {
    lastId = data.recipes[data.recipes.length - 1].id + 1;
  }

  const create_at = Date.now();
  const id = Number(lastId);

  data.recipes.push({
    id,
    image,
    title,
    author,
    ingredients,
    preparation,
    information,
    create_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");

    return res.redirect(`/admin/recipes/${id}`);
  });
};

//mostra uma receita
exports.show = function (req, res) {
  const { id } = req.params;

  let foundRecipe;

  for (let i = 0; i < data.recipes.length; i++) {
    if (data.recipes[i].id == id) {
      foundRecipe = data.recipes[i];
    }
  }

  if (!foundRecipe) return res.send("Não foi encontrada nenhuma receita");

  const recipe = {
    ...foundRecipe,
  };

  return res.render("admin/show", { recipe });
};

exports.edit = function (req, res) {
  const { id } = req.params;
  let foundRecipe;

  for (let i = 0; i < data.recipes.length; i++) {
    if (data.recipes[i].id == id) {
      foundRecipe = data.recipes[i];
    }
  }

  if (!foundRecipe) return res.send("Não foi encontrada nenhuma receita");

  const recipe = {
    ...foundRecipe,
  };

  return res.render("admin/edit", { recipe });
};

exports.put = function (req, res) {
  const { id } = req.body;

  let foundRecipe;

  for (let i = 0; i < data.recipes.length; i++) {
    if (data.recipes[i].id == id) {
      foundRecipe = data.recipes[i];
    }
  }

  if (!foundRecipe) return res.send("Não foi encontrada nenhuma receita");

  const recipe = {
    ...foundRecipe,
    ...req.body,
  };

  for (let i = 0; i < data.recipes.length; i++) {
    if (data.recipes[i].id == id) {
      data.recipes[i] = recipe;
    }
  }

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write error");

    return res.redirect(`/admin/recipes/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredRecipe = data.recipes.filter(function (recipe) {
    return recipe.id != id;
  });

  data.recipes = filteredRecipe;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");

    return res.redirect("/admin/recipes");
  });
};
