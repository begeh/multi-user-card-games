const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if(req.session.user_id){
    res.render("main");
    }
  });

  router.post('/', (req, res) => {
    //query to check if username enter is in database. then, checks for correct password and creates a cookie if correct credentials
    db.query(`SELECT * FROM users WHERE username = $1;`, [escape(req.body.username)])
      .then(result => {
        if (req.body.password === result.rows[0].password) {
          const templateVars = {};
          templateVars.username = req.body.username;
          req.session.user_id = req.body.username;
          //query to create data for leaderboard that is exported in templateVars when rendering /main
          db.query(`
          SELECT users.username
        as user, count
        (*) as number_of_wins
        FROM games_db JOIN users ON users.username = winner
        GROUP BY users.username
          ORDER BY number_of_wins DESC;
          `)
            .then((res) => {
              templateVars.leaderboard = res.rows;
            })
            .then(() => {
              //query to create data for data for player's game history and adds to templateVars
              db.query(`SELECT player1, player2, winner
            FROM games_db
            WHERE '${req.body.username}' = games_db.player1 OR '${req.body.username}' = games_db.player2;`)
                .then((result) => {
                  templateVars.history = result.rows;
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
