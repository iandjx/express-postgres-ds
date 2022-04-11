const express = require("express");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
var cors = require("cors");

const pool = new Pool({
  user: "postgres",
  host: "nba-visualization-project.ctxd45yjwfgs.us-east-2.rds.amazonaws.com",
  password: "Rice!Team04",
  database: "nba-db",
  port: 5432,
});
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (request, response) => {
  pool.query(
    'SELECT "players"."Player", "players"."height", "players"."weight", "players"."born", "modern_season_stats"."Year", "modern_season_stats"."Position", "modern_season_stats"."PTS", "modern_season_stats"."AST" FROM players INNER JOIN  modern_season_stats ON "modern_season_stats"."Player"="players"."Player"',
    (error, results) => {
      if (error) {
        console.log(error);
      }
      response.status(200).json(results.rows);
    }
  );
  // pool.query(
  //   "SELECT * FROM modern_season_stats INNER JOIN players ON modern_season_stats.Player=players.Player ",
  //   (error, results) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     response.status(200).json(results.rows);
  //   }
  // );
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
