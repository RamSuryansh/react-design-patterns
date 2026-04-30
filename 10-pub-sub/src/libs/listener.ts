import type { AppEventMessage } from '../types/events'
import { crossTabChannel } from './broadcast'
import { eventBus } from './event-bus'

crossTabChannel.onmessage = ({ data }) => {
  const message = data as AppEventMessage

  // Re-publish locally WITHOUT rebroadcasting
  eventBus.publish(message.eventName, message.payload, { broadcast: false })
}
