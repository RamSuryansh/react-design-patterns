import { useEffect } from 'react'
import { eventBus } from '../libs/event-bus'
import type { AppEventName, AppEvents } from '../types/events'

export function useEvent<EventName extends AppEventName>(
  eventName: EventName,
  handler: (payload: AppEvents[EventName]) => void,
) {
  useEffect(() => {
    const unsubscribe = eventBus.subscribe(eventName, handler)

    return unsubscribe
  }, [eventName, handler])
}
