import Message from './models/messageModel.js';

class MessageManager {
  async getAllMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      throw new Error('Error retrieving messages');
    }
  }

  async createMessage(user, message) {
    try {
      const newMessage = new Message({ user, message });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw new Error('Error creating message');
    }
  }
}

export default MessageManager;
