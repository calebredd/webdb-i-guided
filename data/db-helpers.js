const db = require("./db-config.js");
//Longhand version of select all in a Table:
// db.select('*').from('posts');
//shortcut:
// db('posts');

//Access entire table:
db("posts");
//use .where() to access specific item in table:
db("posts").where({ id: 3 });
//Resolves to an array containing the id of the new post:
db("posts").insert({
  title: "Caleb",
  contents: "Youngest of children, but first to attend Lambda!"
});
//Resolves to the count of records updated(Probably '1'):
db("posts")
  .where({ id: 1 })
  .update({ title: "First Updated Title" });

function find() {
  return db("posts");
}

function findById(id) {
  return db("posts").where({ id: Number(id) });
}

function insert(post) {
  return db("posts")
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("posts")
    .where({ id: Number(id) })
    .update(post);
}

function remove(id){
  return db('posts').where({id:Number(id)}).del();
}

module.exports = { find, findById, insert, update, remove };
