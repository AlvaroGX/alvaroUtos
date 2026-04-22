const express = require('express');
const cors = require('cors');
require('dotenv').config();

const supabase = require('./conexion');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────
// GET
// ─────────────────────────────────────────
app.get('/categorias', async (req, res) => {
    const { data, error } = await supabase
        .from('categoria')
        .select('*')
        .order('id_categoria', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
});

// ─────────────────────────────────────────
// POST
// ─────────────────────────────────────────
app.post('/categorias', async (req, res) => {
    const { descripcion } = req.body;

    if (!descripcion) {
        return res.status(400).json({ error: 'Descripción requerida' });
    }

    const { data, error } = await supabase
        .from('categoria')
        .insert([{ descripcion }])
        .select();

    if (error) return res.status(500).json({ error: error.message });

    res.json(data[0]);
});

// ─────────────────────────────────────────
// PUT
// ─────────────────────────────────────────
app.put('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;

    const { data, error } = await supabase
        .from('categoria')
        .update({ descripcion })
        .eq('id_categoria', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });

    res.json(data[0]);
});

// ─────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────
app.delete('/categorias/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('categoria')
        .delete()
        .eq('id_categoria', id);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ mensaje: 'Eliminado correctamente' });
});

// ─────────────────────────────────────────
// SERVER
// ─────────────────────────────────────────
app.listen(port, () => {
    console.log(`🚀 Servidor en http://localhost:${port}`);
});