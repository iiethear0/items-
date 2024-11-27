/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the item
 *         name:
 *           type: string
 *           description: The name of the item
 *         description:
 *           type: string
 *           description: A brief description of the item
 *       required:
 *         - name
 *       example:
 *         id: 1
 *         name: Sample Item
 *         description: This is a sample item
 */

const express = require('express');
const router = express.Router();

let items = []; // In-memory storage for items
let nextId = 1; // ID counter

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Retrieve a list of items
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get('/items', (req, res) => {
    res.json(items);
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 */
router.post('/items', (req, res) => {
    const { name, description } = req.body;
    const newItem = { id: nextId++, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the item
 *     responses:
 *       200:
 *         description: The requested item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find((item) => item.id === parseInt(id));
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
});

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 */
router.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const item = items.find((item) => item.id === parseInt(id));
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.name = name || item.name;
    item.description = description || item.description;
    res.json(item);
});

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the item
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */
router.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = items.findIndex((item) => item.id === parseInt(id));
    if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });

    items.splice(itemIndex, 1);
    res.json({ message: 'Item deleted successfully' });
});

module.exports = router;
