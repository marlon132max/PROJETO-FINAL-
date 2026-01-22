import { Router } from 'express';
import { supabase } from '../db/supabaseClient.js';

const router = Router();

// GET /api/cidades
router.get('/cidades', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cidade')
      .select('*')
      .order('nome');

    if (error) {
      return res.status(500).json({
        erro: 'Erro ao buscar cidades',
        detalhes: error.message
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      erro: 'Erro inesperado no servidor',
      detalhes: err.message
    });
  }
});

export default router;