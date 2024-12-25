export const generateRandomMessages = (userId) => {
  const messages = [];
  const senderIds = ['Me', userId === 1 ? 'Alice' : 'Bob']; // Assuming userId 1 is Alice and 2 is Bob

  for (let i = 0; i < 20; i++) {
    const senderId = senderIds[Math.floor(Math.random() * senderIds.length)];
    messages.push({
      id: i + 1,
      senderId,
      content: `Message ${i + 1} from ${senderId}`,
      timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(), // Random timestamp
    });
  }
  return messages;
}; 