const ErrorResponse = require('../../utils/errorResponse');

const Contact = require('../../models/Contact');

getContacts = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

addContact = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ success: true, data: contact });
};

getContact = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact)
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  res.status(201).json({ success: true, data: contact });
};

updateContact = async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: contact });
};

deleteContact = async (req, res, next) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
};

module.exports = {
  getContacts,
  addContact,
  getContact,
  updateContact,
  deleteContact,
};
