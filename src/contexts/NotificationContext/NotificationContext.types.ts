export interface NotificationMessage {
  messageId?: string;
  messageType?: string;
  from?: string;
  to?: string;
  ttl?: number;
  sentTime?: number;
  data?: { [key: string]: string | object };
  notification?: { body?: string; icon?: string; title?: string };
  contentAvailable?: boolean;
  mutableContent?: boolean;
  category?: string;
  threadId?: string;
}
