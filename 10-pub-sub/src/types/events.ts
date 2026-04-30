export type CartItem = {
  id: string
  name: string
}

export type AppEvents = {
  'cart:add': CartItem
}

export type AppEventName = keyof AppEvents

export type AppEventMessage<EventName extends AppEventName = AppEventName> = {
  eventName: EventName
  payload: AppEvents[EventName]
}
