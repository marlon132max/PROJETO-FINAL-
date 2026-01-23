import express from "express";
import { supabase } from "../db/supabaseClient.js";

const router = express.Router();

// ================= CADASTRO =================
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  const { error } = await supabase
    .from("usuario")
    .insert([{ nome, email, senha }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Usuário cadastrado com sucesso" });
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const { data, error } = await supabase
    .from("usuario")
    .select("id, nome, email")
    .eq("email", email)
    .eq("senha", senha)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: "E-mail ou senha inválidos" });
  }

  res.json(data);
});

// ================= PERFIL =================
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("usuario")
    .select("id, nome, email")
    .eq("id", id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json(data);
});

export default router;
