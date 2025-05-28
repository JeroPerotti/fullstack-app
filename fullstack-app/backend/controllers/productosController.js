const fs = require('fs');
const path = './data/productos.json';

function getAll(req, res) {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
}

function create(req, res) {
  const productos = JSON.parse(fs.readFileSync(path));
  const nuevo = { id: Date.now(), ...req.body };
  productos.push(nuevo);
  fs.writeFileSync(path, JSON.stringify(productos));
  res.status(201).json(nuevo);
}

function update(req, res) {
  const productos = JSON.parse(fs.readFileSync(path));
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index >= 0) {
    productos[index] = { ...productos[index], ...req.body };
    fs.writeFileSync(path, JSON.stringify(productos));
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
}

function remove(req, res) {
  let productos = JSON.parse(fs.readFileSync(path));
  productos = productos.filter(p => p.id != req.params.id);
  fs.writeFileSync(path, JSON.stringify(productos));
  res.json({ mensaje: 'Producto eliminado' });
}

module.exports = { getAll, create, update, remove };
