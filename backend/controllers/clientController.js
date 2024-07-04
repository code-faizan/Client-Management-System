const Client = require('../models/Client');

// exports.getClients = async (req, res) => {
//   try {
//     const clients = await Client.find();
//     res.json(clients);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
exports.getClients = async (req, res) => {
  console.log('GetClients called');
  try {
    const clients = await Client.find();
    console.log('Clients found:', clients);
    res.json(clients);
  } catch (err) {
    console.error('Error in getClients:', err.message);
    res.status(500).send('Server Error');
  }
};

exports.createClient = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const newClient = new Client({ name, email, phone, address });
    const client = await newClient.save();
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateClient = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    let client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email, phone, address } },
      { new: true }
    );

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// exports.deleteClient = async (req, res) => {
//   try {
//     await Client.findByIdAndRemove(req.params.id);
//     res.json({ msg: 'Client removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
exports.deleteClient = async (req, res) => {
  try {
    console.log('Attempting to delete client with ID:', req.params.id);
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      console.log('Client not found for deletion');
      return res.status(404).json({ message: 'Client not found' });
    }
    console.log('Client deleted successfully');
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error('Error in deleteClient:', err);
    res.status(500).json({ message: err.message });
  }
};
