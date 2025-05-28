const fs = require('fs');
const path = './data/usuarios.json';

function getAll(req, res) {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
}

function create(req, res) {
  const usuarios = JSON.parse(fs.readFileSync(path));
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  fs.writeFileSync(path, JSON.stringify(usuarios));
  res.status(201).json(nuevo);
}

function update(req, res) {
  const usuarios = JSON.parse(fs.readFileSync(path));
  const index = usuarios.findIndex(u => u.id == req.params.id);
  if (index >= 0) {
    usuarios[index] = { ...usuarios[index], ...req.body };
    fs.writeFileSync(path, JSON.stringify(usuarios));
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
}

function remove(req, res) {
  let usuarios = JSON.parse(fs.readFileSync(path));
  usuarios = usuarios.filter(u => u.id != req.params.id);
  fs.writeFileSync(path, JSON.stringify(usuarios));
  res.json({ mensaje: 'Usuario eliminado' });
}

module.exports = { getAll, create, update, remove };
