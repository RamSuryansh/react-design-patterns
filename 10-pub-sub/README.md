# React Design Patterns: Pub/Sub

This app demonstrates the publish-subscribe pattern in a React + TypeScript + Vite application. The publisher emits a cart event, the subscriber reacts to that event, and neither component imports or calls the other directly.

## Knowledge Base

### Pattern Summary

Pub/sub is useful when one part of an app needs to announce that something happened, while other parts may respond without creating direct component coupling.

In this project:

- `AddToCartButton` is the publisher.
- `CartBadge` is the subscriber.
- `eventBus` is the in-memory event broker.
- `BroadcastChannel` mirrors events across browser tabs.
- `useEvent` connects React components to the event bus with cleanup on unmount.

### Source Map

- `src/types/events.ts`: central TypeScript event contract.
- `src/libs/event-bus.ts`: typed subscribe and publish API.
- `src/libs/broadcast.ts`: shared browser channel for cross-tab messages.
- `src/libs/listener.ts`: receives cross-tab messages and republishes them locally.
- `src/hooks/use-event.ts`: React hook for subscribing to events.
- `src/components/pub/add-to-card-btn.tsx`: publishes `cart:add`.
- `src/components/sub/cart-badge.tsx`: subscribes to `cart:add`.

### Event Flow

1. The user clicks `Add to Cart`.
2. `AddToCartButton` publishes `cart:add` with a cart item payload.
3. `eventBus` calls every local subscriber for `cart:add`.
4. `eventBus` also posts the event to `BroadcastChannel`.
5. Other tabs receive the message in `listener.ts`.
6. The received event is republished locally with broadcasting disabled to avoid loops.
7. `CartBadge` updates its local item list and count.

### TypeScript Event Contract

All supported events are defined in `src/types/events.ts`.

```ts
export type AppEvents = {
  'cart:add': CartItem
}
```

This gives compile-time safety to both sides:

- A publisher must send the correct payload for the event name.
- A subscriber receives the correct payload type for the event name.
- Unknown event names are rejected by TypeScript.

To add a new event, add it to `AppEvents` first, then publish or subscribe using that event name.

### Local Development

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Run validation:

```bash
pnpm lint
pnpm build
```

### Design Notes

- Keep event names specific and action-oriented, such as `cart:add` or `user:login`.
- Keep event payloads small and serializable so cross-tab broadcasting works reliably.
- Prefer functional state updates in subscribers when the next state depends on the previous state.
- Use pub/sub for decoupled notifications, not as a replacement for all shared state.
