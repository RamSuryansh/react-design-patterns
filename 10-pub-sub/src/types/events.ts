export type CartItem = {
  id: string
  name: string
}

export type NotificationCategory = 'success' | 'error' | 'warning' | 'info'

export type Notification = {
  id: string
  title: string
  message: string
  category: NotificationCategory
  createdAt: number
  autoHideMs: number
}

export type AppEvents = {
  'cart:add': CartItem
  'notification:add': Notification
}

export type AppEventName = keyof AppEvents

export type AppEventMessage<EventName extends AppEventName = AppEventName> = {
  eventName: EventName
  payload: AppEvents[EventName]
}
