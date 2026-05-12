# Controlled and Uncontrolled Forms

This section explores two fundamental patterns for managing form state in React: **Controlled Components** and **Uncontrolled Components**.

## What is a Controlled Component?

A **controlled component** is a React component where form data is handled by the React component state. The component controls the input values through state management, and updates are synchronized with React state via event handlers.

### Key Characteristics:
- Form value is stored in React state
- Component re-renders when state changes
- Every state change triggers a render
- Input value is always synchronized with component state
- Requires explicit onChange handlers to update state
- Predictable behavior - single source of truth is React state

### Example of Controlled Component:
```tsx
import { useState } from 'react'

function ControlledForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter email"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

### Advantages:
- ✅ Easy validation and error handling
- ✅ Dynamic form submission button state
- ✅ Instant inline validation feedback
- ✅ Easy to implement conditional rendering based on input
- ✅ Centralized state management
- ✅ Full control over input behavior

### Disadvantages:
- ❌ More boilerplate code
- ❌ Multiple re-renders for each input change
- ❌ More memory usage for complex forms
- ❌ More state management overhead

---

## What is an Uncontrolled Component?

An **uncontrolled component** is a React component where form data is handled by the DOM itself. The component does not maintain state for form values; instead, it accesses the input value directly from the DOM using refs.

### Key Characteristics:
- Form value is stored in the DOM
- React doesn't control the input value
- Less re-renders compared to controlled components
- Uses `useRef` to access DOM values
- Single point of truth is the DOM
- Minimal state management
- No onChange handlers needed for every input

### Example of Uncontrolled Component:
```tsx
import { useRef } from 'react'

function UncontrolledForm() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    console.log('Form submitted:', { email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={emailRef}
        type="email"
        placeholder="Enter email"
        defaultValue=""
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Enter password"
        defaultValue=""
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

### Advantages:
- ✅ Less boilerplate code
- ✅ Fewer re-renders
- ✅ Better performance for large forms
- ✅ Easier integration with non-React code
- ✅ Simpler for one-time form submissions
- ✅ Lower memory footprint

### Disadvantages:
- ❌ Harder to implement validation
- ❌ Can't disable submit button based on input state
- ❌ Difficult to implement instant feedback
- ❌ Less predictable behavior
- ❌ Harder to test
- ❌ Limited control over input behavior

---

## Comparison: Controlled vs Uncontrolled

| Feature | Controlled | Uncontrolled |
|---------|-----------|--------------|
| State Management | React state | DOM |
| Performance | More re-renders | Fewer re-renders |
| Validation | Easy inline validation | Validation on submit |
| Code Complexity | More verbose | Less verbose |
| Testing | Easier to test | Harder to test |
| Real-time Feedback | ✅ Supported | ❌ Not ideal |
| Submit Button State | ✅ Easy to control | ❌ Difficult |
| Form Reset | ✅ Easy with state | ❌ Manual handling |
| Integration | ✅ Better with React | ⚠️ Works with non-React |

---

## When to Use Each

### Use Controlled Components When:
- You need real-time validation or feedback
- You want to disable/enable submit button based on form state
- You need conditional field rendering
- You're building a complex form with dependent fields
- You need to implement auto-save functionality
- You want easier unit testing

### Use Uncontrolled Components When:
- Building simple, one-time forms
- Integrating with file inputs or media elements
- You need better performance with very large forms
- Integrating with non-React libraries
- Building forms that don't need real-time validation
- You want minimal boilerplate code

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom):

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
