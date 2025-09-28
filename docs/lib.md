# Lib

## `src/lib/utils.ts`

### `cn(...inputs: ClassValue[]) => string`
- Tailwind/clsx className combiner using `clsx` and `tailwind-merge`.
- Example:
```ts
import { cn } from '@/lib/utils';

const classes = cn('px-2', condition && 'text-red-500');
```

## `src/lib/emailjsClient.ts`

### `initEmailJS(): void`
- Initializes EmailJS with `VITE_EMAILJS_PUBLIC_KEY`. Call once in `App.tsx` or `main.tsx`.
- Example:
```ts
import { initEmailJS } from '@/lib/emailjsClient';
initEmailJS();
```

### `sendTemplate(variables: EmailVariables): Promise<unknown>`
- Sends the configured template using service and template IDs from env.
- `EmailVariables` shape:
  - `user_name: string`
  - `user_email: string`
  - `message: string`
  - `[key: string]: unknown` (extendable)
- Example:
```ts
import { sendTemplate } from '@/lib/emailjsClient';
await sendTemplate({ user_name: 'Jane', user_email: 'j@example.com', message: 'Hi!' });
```