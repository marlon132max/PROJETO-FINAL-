import express from "express";
import { supabase } from "../db/supabaseClient.js";

const router = express.Router();

// GET /api/roteiros/:cidadeId
router.get("/:cidadeId", async (req, res) => {
  const { cidadeId } = req.params;

  // 1️⃣ Buscar os roteiro_id ligados à cidade
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

  // 2️⃣ Buscar os roteiros
  const { data: roteiros, error: erroRoteiros } = await supabase
    .from("roteiros")
    .select("*")
    .in("id", roteiroIds);

  if (erroRoteiros) {
    return res.status(500).json({ error: erroRoteiros.message });
  }

  res.json(roteiros);
});

export default router;