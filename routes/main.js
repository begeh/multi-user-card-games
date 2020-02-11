const express = require('express');
const router = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("main");
  });

  router.post('/', (req, res) => {
    db.query(`SELECT * FROM users WHERE username = $1;`, [req.body.username])
      .then(result => {
        if (req.body.password === result.rows[0].password) {
          const templateVars = {};
          templateVars.username = req.body.username;
          req.session.user_id = req.body.username;
          res.render('main', templateVars);
        } else {
          res.send("Wrong Password");
        }
      })
      .catch(() => res.send("User not in database"));
  });
  return router;
}
