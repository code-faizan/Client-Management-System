// const express = require('express');
// const Service = require('../models/Service');
// const auth = require('../middleware/auth');
// const router = express.Router();

// // Get all services
// router.get('/', auth, async (req, res) => {
//   try {
//     const services = await Service.find().populate('client', 'name');
//     res.json(services);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Add a service
// router.post('/', auth, async (req, res) => {
//   try {
//     const newService = new Service(req.body);
//     const service = await newService.save();
//     res.json(service);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Update a service
// router.put('/:id', auth, async (req, res) => {
//   try {
//     const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!service) {
//       return res.status(404).json({ msg: 'Service not found' });
//     }
//     res.json(service);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Delete a service
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const service = await Service.findByIdAndRemove(req.params.id);
//     if (!service) {
//       return res.status(404).json({ msg: 'Service not found' });
//     }
//     res.json({ msg: 'Service removed' });
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
  getServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

// @route    GET api/services
// @desc     Get all services
// @access   Private
router.get('/', auth, getServices);

// @route    POST api/services
// @desc     Create a service
// @access   Private
router.post('/', auth, createService);

// @route    PUT api/services/:id
// @desc     Update a service
// @access   Private
router.put('/:id', auth, updateService);

// @route    DELETE api/services/:id
// @desc     Delete a service
// @access   Private
router.delete('/:id', auth, deleteService);

module.exports = router;
