import express, { Express, NextFunction, Request, Response, Router } from "express";
import morgan from "morgan";
const app: Express = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/", (res: Response, req: Request) => {
  res.json("health");
});

const PORT: string | number = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(process.env.DATABASE_URL);
  console.log(`Server listening on http://localhost:${PORT}`);
});
