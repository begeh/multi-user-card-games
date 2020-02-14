const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("main");
  });

  router.post('/', (req, res) => {

    db.query(`SELECT * FROM users WHERE username = $1;`, [escape(req.body.username)])
      .then(result => {
        if (req.body.password === result.rows[0].password) {
          const templateVars = {};
          templateVars.username = req.body.username;
          req.session.user_id = req.body.username;
          db.query(`
          SELECT users.username
        as user, count
        (*) as number_of_wins
        FROM games_db JOIN users ON users.username = winner
        GROUP BY users.username
          ORDER BY number_of_wins DESC;
          `)
          .then((res)=>{
            templateVars.leaderboard = res.rows;
          })
          .then(()=>{
            db.query(`SELECT player1, player2, winner
            FROM games_db
            WHERE '${req.body.username}' = games_db.player1 OR '${req.body.username}' = games_db.player2;`)
            .then((result)=>{
              templateVars.history = result.rows;
              console.log(templateVars);
              res.render('main', templateVars);
            })
          });
        } else {
          res.send("Wrong Password");
        }
      })
      .catch(() => res.send("User not in database"));
  });
  return router;
}
