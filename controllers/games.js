var Games = require("../models/games");
// List of all Costumes
exports.games_list = async function (req, res) {
  try {
    theGames = await Games.find();
    res.send(theGames);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
// for a specific games.
exports.games_detail = async function (req, res) {
  console.log("detail" + req.params.id);
  try {
    result = await Games.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};
// Handle Costume create on POST.
exports.games_create_post = async function (req, res) {
  console.log(req.body);
  let document = new Games();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"game_name":"goat", "player_count":"12", "ticket_price":2000}
  document.game_name = req.body.game_name;
  document.player_count = req.body.player_count;
  document.ticket_price = req.body.ticket_price;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
// Handle games delete form on DELETE.
exports.games_delete = function (req, res) {
  res.send("NOT IMPLEMENTED: Games delete DELETE " + req.params.id);
};
// Handle games update form on PUT.
exports.games_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body
  ${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Games.findById(req.params.id);
    // Do updates of properties
    if (req.body.games_type) toUpdate.games_type = req.body.games_type;
    if (req.body.cost) toUpdate.cost = req.body.cost;
    if (req.body.size) toUpdate.size = req.body.size;
    let result = await toUpdate.save();
    console.log("Sucess " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}: Update for id ${req.params.id}
  failed`);
  }
};

// VIEWS
// Handle a show all view
exports.games_view_all_Page = async function (req, res) {
  try {
    theGames = await Games.find();
    res.render("games", { title: "Games Search Results", results: theGames });
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle Games delete form on DELETE.
exports.games_delete = async function (req, res) {
  console.log("delete " + req.params.id);
  try {
    result = await Games.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": Error deleting ${err}}`);
  }
};

// Handle a show one view with id specified by query
exports.games_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id);
  try {
    result = await Games.findById(req.query.id);
    res.render("gamesdetail", { title: "Games Detail", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a games.
// No body, no in path parameter, no query.
// Does not need to be async
exports.games_create_Page = function (req, res) {
  console.log("create view");
  try {
    res.render("gamescreate", { title: "Games Create" });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a games.
// query provides the id
exports.games_update_Page = async function (req, res) {
  console.log("update view for item " + req.query.id);
  try {
    let result = await Games.findById(req.query.id);
    res.render("gamesupdate", { title: "Games Update", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};
//Handle a delete one view with id from query
exports.games_delete_Page = async function (req, res) {
  console.log("Delete view for id " + req.query.id);
  try {
    result = await Games.findById(req.query.id);
    res.render("gamesdelete", { title: "Games Delete", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};
