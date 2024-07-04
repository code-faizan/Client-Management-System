const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().populate('client');
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createService = async (req, res) => {
  const { name, description, client, startDate, endDate } = req.body;

  try {
    const newService = new Service({ name, description, client, startDate, endDate });
    const service = await newService.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateService = async (req, res) => {
  const { name, description, client, startDate, endDate } = req.body;

  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description, client, startDate, endDate } },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// exports.deleteService = async (req, res) => {
//   try {
//     await Service.findByIdAndRemove(req.params.id);
//     res.json({ msg: 'Service removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
exports.deleteService = async (req, res) => {
  try {
    console.log('Attempting to delete service with ID:', req.params.id);
    
    let service = await Service.findById(req.params.id);

    if (!service) {
      console.log('Service not found');
      return res.status(404).json({ msg: 'Service not found' });
    }

    await Service.findByIdAndDelete(req.params.id);

    console.log('Service successfully deleted');
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error('Error in deleteService:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};