import express from 'express';
import cors from 'cors';

import statusRoutes from './routes/status.routes.js';
import cidadesRoutes from './routes/cidades.routes.js';
import roteirosRoutes from "./routes/roteiros.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/status", statusRoutes);
app.use("/api/cidades", cidadesRoutes);
app.use("/api/roteiros", roteirosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
