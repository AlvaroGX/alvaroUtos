const express = require('express');
const cors = require('cors');
const supabase = require('./conexion');

const app = express();
const port = process.env.PORT || 3127;

app.use(cors());
app.use(express.json());

// GET
app.get('/categorias', async (req, res) => {
    const { data, error } = await supabase
        .from('categoriautos')
        .select('*');

    if (error) return res.status(500).json(error);

    res.json(data);
});

// POST
app.post('/categorias', async (req, res) => {
    const { descripcion } = req.body;

    const { data, error } = await supabase
        .from('categoriautos')
        .insert([{ descripcion }])
        .select();

    if (error) return res.status(500).json(error);

    res.json(data);
});

// PUT
app.put('/categorias/:id', async (req, res) => {
    const id = req.params.id;
    const { descripcion } = req.body;

    const { data, error } = await supabase
        .from('categoriautos')
        .update({ descripcion })
        .eq('id_categoria', id)
        .select();

    if (error) return res.status(500).json(error);

    res.json(data);
});

// DELETE
app.delete('/categorias/:id', async (req, res) => {
    const id = req.params.id;

    const { error } = await supabase
        .from('categoriautos')
        .delete()
        .eq('id_categoria', id);

    if (error) return res.status(500).json(error);

    res.json({ mensaje: 'Categoría eliminada' });
});

app.listen(port, () => {
    console.log('Servidor en http://localhost:' + port);
});