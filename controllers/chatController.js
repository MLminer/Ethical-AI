const axios = require('axios');
const Chat = require('../models/Vote');

const detectHateSpeech = async (text) => {
    const response = await axios.post(
        'https://api-inference.huggingface.co/models/llm-model',
        { inputs: text },
        { headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}` } }
    );
    return response.data;
};

exports.createChat = async (req, res) => {
    const { text, userId } = req.body;
    try {
        const moderationResult = await detectHateSpeech(text);
        const chat = new Chat({ text, userId });
        await chat.save();
        res.json({ moderationResult, chatId: chat._id });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
