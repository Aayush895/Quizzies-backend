import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(express.static("public"));

// imports for all the routes
import userRouter from "./routes/user.routes.js";
import quizRouter from "./routes/quiz.routes.js";

app.use("/users", userRouter);
app.use("/quiz", quizRouter);

export { app };
