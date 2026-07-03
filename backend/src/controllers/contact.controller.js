const { Contact } = require('../models');
const { AppError, NotFoundError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message, course } = req.body;

  if (!name || !email || !subject || !message) {
    throw new AppError('Name, email, subject, and message are required', 400);
  }

  const contact = await Contact.create({ name, email, phone, subject, message, course });

  sendResponse(res, 201, { contact }, 'Your message has been received. We will get back to you soon.');
});

const getContacts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const features = new APIFeatures(Contact.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const contacts = await features.query;
  const total = await Contact.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { contacts }, pagination);
});

const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new AppError('Status is required', 400);
  }

  const validStatuses = ['new', 'read', 'replied', 'closed'];
  if (!validStatuses.includes(status)) {
    throw new AppError(`Invalid status. Valid values: ${validStatuses.join(', ')}`, 400);
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) {
    throw new NotFoundError('Contact');
  }

  sendResponse(res, 200, { contact }, 'Contact status updated');
});

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
};
