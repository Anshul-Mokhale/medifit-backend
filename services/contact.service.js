const ContactModel = require('../models/contact.model');

const { contactSchema } = require('../validations/contact.validation');
const { sendThankYouEmail } = require('../utils/mailer');

// this is the function that will be used to process the contact request
const ContactRequest = async (contactData) => {
    try {
        const { error } = contactSchema.validate(contactData);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await ContactModel.ContactModel(contactData);
        if (result && contactData.email) {
            await sendThankYouEmail(contactData.email, contactData.name || 'User');
        }

        return result;
    }
    catch (err) {
        console.error('Error processing contact request:', err);
        throw err;
    }

}

module.exports = {
    ContactRequest
}