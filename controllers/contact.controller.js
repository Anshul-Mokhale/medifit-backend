const contactService = require('../services/contact.service');

const contactRequest = async (req, res) => {
    try {
        const result = await contactService.ContactRequest(req.body);
        if (result) {
            return res.status(200).json({ status: 200, message: 'Contact request sent successfully', data: result });
        }
        else {
            return res.status(400).json({ status: 400, message: 'Failed to send contact request' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

module.exports = {
    contactRequest
}