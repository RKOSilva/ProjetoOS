const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/auth');

// Criar OS - só admin cria, por exemplo
router.post('/', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ error: 'Acesso negado' });

  try {
    const { descricao, cliente, tecnico } = req.body;
    const order = new Order({ descricao, cliente, tecnico });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar OS' });
  }
});

// Listar todas OS - admin vê todas
router.get('/', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ error: 'Acesso negado' });

  try {
    const orders = await Order.find().populate('tecnico', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar OS' });
  }
});

// Listar OS do técnico logado
router.get('/minhas', verifyToken, async (req, res) => {
  if (req.userRole !== 'tecnico') return res.status(403).json({ error: 'Acesso negado' });

  try {
    const orders = await Order.find({ tecnico: req.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar suas OS' });
  }
});

// Atualizar status OS (iniciar, finalizar)
router.patch('/:id/status', verifyToken, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'OS não encontrada' });

    // Se quiser, pode validar se só o técnico responsável pode atualizar
    if (req.userRole === 'tecnico' && order.tecnico.toString() !== req.userId) {
      return res.status(403).json({ error: 'Você não pode atualizar essa OS' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

module.exports = router;
