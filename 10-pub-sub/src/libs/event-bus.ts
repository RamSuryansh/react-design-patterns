import type { AppEventMessage, AppEventName, AppEvents } from '../types/events'
import { crossTabChannel } from './broadcast'

type EventHandler<EventName extends AppEventName> = (
  payload: AppEvents[EventName],
) => void

type EventBus = {
  subscribe<EventName extends AppEventName>(
    eventName: EventName,
    handler: EventHandler<EventName>,
  ): () => void
  publish<EventName extends AppEventName>(
    eventName: EventName,
    payload: AppEvents[EventName],
    options?: { broadcast?: boolean },
  ): void
}

const listeners = new Map<AppEventName, Set<EventHandler<AppEventName>>>()

export const eventBus: EventBus = {
  subscribe(eventName, handler) {
    if (!listeners.has(eventName)) {
      listeners.set(eventName, new Set())
    }

    listeners.get(eventName)?.add(handler as EventHandler<AppEventName>)

    return () => {
      listeners.get(eventName)?.delete(handler as EventHandler<AppEventName>)
    }
  },

  publish(eventName, payload, { broadcast = true } = {}) {
    listeners.get(eventName)?.forEach((handler) => {
      handler(payload)
    })

    if (broadcast) {
      crossTabChannel.postMessage({
        eventName,
        payload,
      } satisfies AppEventMessage<typeof eventName>)
    }
  },
}
