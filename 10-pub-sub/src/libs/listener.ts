import { crossTabChannel } from './broadcast'
import { eventBus } from './event-bus'
import type { AppEventMessage } from '../types/events'

crossTabChannel.onmessage = ({ data }) => {
  const message = data as AppEventMessage

  // Re-publish locally WITHOUT rebroadcasting
  eventBus.publish(message.eventName, message.payload, { broadcast: false })
}
