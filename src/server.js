import express from 'express';
import cors from 'cors';

import statusRoutes from './routes/status.routes.js';
import cidadesRoutes from './routes/cidades.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', statusRoutes);
app.use('/api', cidadesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
