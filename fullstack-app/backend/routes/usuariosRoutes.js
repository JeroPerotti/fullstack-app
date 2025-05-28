const express = require('express');
const router = express.Router();

let personas = [];

const getAll = (req, res) => {
  res.json(personas);
};

const create = (req, res) => {
  console.log('Datos recibidos:', req.body);

  const nuevaPersona = req.body;

  if (!nuevaPersona.nombre || !nuevaPersona.email || !nuevaPersona.edad) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  nuevaPersona.id = Date.now();
  personas.push(nuevaPersona);
  res.status(201).json(nuevaPersona);
};

const update = (req, res) => {
  const { id } = req.params;
  const personaActualizada = req.body;

  personas = personas.map(p => p.id == id ? { ...p, ...personaActualizada } : p);
  res.json({ message: 'Persona actualizada' });
};

const remove = (req, res) => {
  const { id } = req.params;
  personas = personas.filter(p => p.id != id);
  res.json({ message: 'Persona eliminada' });
};

router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
