import { defaultMessagesForm } from '../../config/superAdmin/messages';
import type { MessagesFormData } from '../../config/superAdmin/messages';

// Keep local in-memory storage of messages to persist changes across routes
let messagesInMemory: MessagesFormData = { ...defaultMessagesForm };

export const messagesService = {
  /**
   * Retrieves current system message configurations.
   */
  getMessages(): Promise<MessagesFormData> {
    return Promise.resolve({ ...messagesInMemory });
  },

  /**
   * Mutates system messages in-memory.
   */
  updateMessages(data: MessagesFormData): Promise<void> {
    messagesInMemory = { ...data };
    return Promise.resolve();
  },
};
