import * as dotenv from "dotenv";
import "reflect-metadata";
import "express-async-errors";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";
import "./database";

import GlobalRoutes from "./routes/GlobalRoutes";
import SupportRoutes from "./routes/SupportRoutes";
import ConsumerRoutes from "./routes/ConsumerRoutes";
import CompanyRoutes from "./routes/CompanyRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/global", GlobalRoutes);
app.use("/support", SupportRoutes);
app.use("/consumer", ConsumerRoutes);
app.use("/company", CompanyRoutes);
app.use("/admin", AdminRoutes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json(error);
  }
);

app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({ message: "Endpoint inexistente" });
  next();
});

app.use((request: Request, response: Response) => {
  return response.status(500).json({ message: "Erro inexperado" });
});

app.listen(process.env.PORT || 3333);
