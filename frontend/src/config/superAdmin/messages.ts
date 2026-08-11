export interface MessagesFormData {
  headerMessage: string;
  adminMessage: string;
  userMessage: string;
  maintenanceEnabled: boolean;
  maintenanceMessage: string;
  headerMessageLink: string;
}

export const defaultMessagesForm: MessagesFormData = {
  headerMessage: 'Drive Exch',
  adminMessage: '🎉🎉 WELCOME TO THE WORLD OF',
  userMessage: '📝 WELCOME TO THE WORLD OF',
  maintenanceEnabled: false,
  maintenanceMessage: 'We are planning to have Schedule maintaince till 2 days',
  headerMessageLink: 'Drive Exch',
};
