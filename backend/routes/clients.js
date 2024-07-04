// const express = require('express');
// const Client = require('../models/Client');
// const auth = require('../middleware/auth');
// const router = express.Router();

// // Get all clients
// router.get('/', auth, async (req, res) => {
//   try {
//     const clients = await Client.find();
//     res.json(clients);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Add a client
// router.post('/', auth, async (req, res) => {
//   try {
//     const newClient = new Client(req.body);
//     const client = await newClient.save();
//     res.json(client);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Update a client
// router.put('/:id', auth, async (req, res) => {
//   try {
//     const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!client) {
//       return res.status(404).json({ msg: 'Client not found' });
//     }
//     res.json(client);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Delete a client
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const client = await Client.findByIdAndRemove(req.params.id);
//     if (!client) {
//       return res.status(404).json({ msg: 'Client not found' });
//     }
//     res.json({ msg: 'Client removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getClients,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

// @route    GET api/clients
// @desc     Get all clients
// @access   Private
router.get('/', auth, getClients);

// @route    POST api/clients
// @desc     Create a client
// @access   Private
router.post('/', auth, createClient);

// @route    PUT api/clients/:id
// @desc     Update a client
// @access   Private
router.put('/:id', auth, updateClient);

// @route    DELETE api/clients/:id
// @desc     Delete a client
// @access   Private
router.delete('/:id', auth, deleteClient);

module.exports = router;
