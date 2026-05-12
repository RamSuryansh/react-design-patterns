# Compound Components Pattern

## What is Compound Composition?

The **Compound Components** pattern is a React design pattern where a set of components work together as a unified whole by sharing implicit state through React Context. Individual components don't work well in isolation; they're designed to be composed together to build a complete feature.

### The Pardesi (Traveler) Example

Imagine a **Pardesi** (stranger/traveler) arriving in a new city. The traveler needs multiple services that work together:

```
┌─────────────────────────────────────────┐
│  Pardesi (Main Compound Component)      │
│  ├─ Location (Context Provider)        │
│  ├─ Accommodation (Uses Location)      │
│  ├─ Food (Uses Location)               │
│  ├─ Transport (Uses Location)          │
│  └─ Guide (Uses Location)              │
└─────────────────────────────────────────┘
```

Each sub-component (Accommodation, Food, Transport, Guide) is a **stranger** to each other, but they all know about the shared **Location** context. They coordinate through this shared context without direct communication.

## Key Characteristics

1. **Implicit State Sharing**: Sub-components share state through Context, not props
2. **Loose Coupling**: Components don't need to know about each other directly
3. **Cohesive API**: Parent component manages the shared state
4. **Flexibility**: Sub-components can be composed in any order

## Code Example

```tsx
// 1. Create Context for shared state
// This is like the "Location" that all services know about
const PardesiContext = createContext<PardesiContextType | null>(null);

// 2. Parent Component (Pardesi) - acts as Context Provider
// This is the traveler who brings all services together
export function Pardesi({ city }: { city: string }) {
  const [accommodation, setAccommodation] = useState("");
  const [food, setFood] = useState("");
  
  return (
    <PardesiContext.Provider value={{ city, accommodation, setAccommodation, food, setFood }}>
      {/* All child components have access to context */}
      <div className="pardesi-journey">
        <PardesiAccommodation />
        <PardesiFood />
        <PardesiTransport />
        <PardesiGuide />
      </div>
    </PardesiContext.Provider>
  );
}

// 3. Sub-components (Strangers) - consume context independently
// Each service knows about the city but doesn't know about other services
function PardesiAccommodation() {
  const context = useContext(PardesiContext);
  return (
    <div>
      <h3>Accommodation in {context?.city}</h3>
      <input 
        value={context?.accommodation}
        onChange={(e) => context?.setAccommodation(e.target.value)}
        placeholder="Enter hotel name"
      />
    </div>
  );
}

function PardesiFood() {
  const context = useContext(PardesiContext);
  return (
    <div>
      <h3>Local Food in {context?.city}</h3>
      <input 
        value={context?.food}
        onChange={(e) => context?.setFood(e.target.value)}
        placeholder="Enter food preference"
      />
    </div>
  );
}

function PardesiTransport() {
  const context = useContext(PardesiContext);
  return (
    <div>
      <h3>Transport in {context?.city}</h3>
      <p>Traveling to: {context?.city}</p>
    </div>
  );
}

function PardesiGuide() {
  const context = useContext(PardesiContext);
  return (
    <div>
      <h3>Local Guide in {context?.city}</h3>
      <p>City: {context?.city}</p>
      <p>Staying at: {context?.accommodation || "Not decided"}</p>
      <p>Eating: {context?.food || "Not decided"}</p>
    </div>
  );
}

// 4. Usage
export default function App() {
  return <Pardesi city="Delhi" />;
}
```

## Changes Made to README

| Aspect | Before | After |
|--------|--------|-------|
| **Content** | Generic Vite/React setup instructions | Compound Components pattern explanation |
| **Example** | ESLint configuration | Pardesi traveler journey analogy |
| **Context** | Build tool documentation | Design pattern documentation |
| **Relevance** | Irrelevant to directory purpose | Aligned with `03-compound-components` |
| **Added** | - | Real code examples with TypeScript |

## When to Use Compound Components

✅ **Use when:**
- Multiple components need to share state
- Components are always used together
- You want to avoid prop drilling
- You need flexible composition

❌ **Avoid when:**
- Components work independently
- State needs to be passed to distant components
- You need maximum reusability across different contexts

## Benefits

- **Cleaner API**: No need to pass props down through multiple levels
- **Flexibility**: Sub-components can be reordered without breaking
- **Maintainability**: Shared state is centralized in the parent
- **Implicit Coupling**: Components naturally work together through context

