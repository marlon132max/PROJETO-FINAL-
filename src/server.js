import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import statusRoutes from "./routes/status.routes.js";
import cidadesRoutes from "./routes/cidades.routes.js";
import roteirosRoutes from "./routes/roteiros.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js"; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/status", statusRoutes);
app.use("/api/cidades", cidadesRoutes);
app.use("/api/roteiros", roteirosRoutes);
app.use("/api/usuario", usuarioRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});

