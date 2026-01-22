import express from "express";
import { supabase } from "../db/supabaseClient.js";

const router = express.Router();

// GET /api/roteiros/:cidadeId
router.get("/:cidadeId", async (req, res) => {
  const { cidadeId } = req.params;

  // 1️⃣ Busca os vínculos
  const { data: itens, error: erroItens } = await supabase
    .from("roteiro_item")
    .select("roteiro_id")
    .eq("cidade_id", cidadeId);

  if (erroItens) {
    return res.status(500).json({ error: erroItens.message });
  }

  if (!itens || itens.length === 0) {
    return res.json([]);
  }

  const roteiroIds = itens.map(item => item.roteiro_id);

  // 2️⃣ Busca os roteiros (NOME CORRETO DA TABELA)
  const { data: roteiros, error: erroRoteiros } = await supabase
    .from("roteiro")   
    .select("*")
    .in("id", roteiroIds);

  if (erroRoteiros) {
    return res.status(500).json({ error: erroRoteiros.message });
  }

  res.json(roteiros);
});

export default router;
