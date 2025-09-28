# UI Primitives

This project includes a set of UI components under `src/components/ui`. Below are primary exports and minimal usage samples.

> Note: Many components re-export multiple subcomponents. Import only what you need.

## Button — `src/components/ui/button.tsx`
- Exports: `Button`, `buttonVariants`, default `Button`
- Props: standard `button` props + `variant` and `size` (`default | destructive | outline | secondary | ghost | link`; `default | sm | lg | icon`)
- Example:
```tsx
import { Button } from '@/components/ui/button';
<Button variant="outline" size="sm">Click</Button>
```

## Card — `src/components/ui/card.tsx`
- Exports: `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`
- Example:
```tsx
import { Card, CardContent, CardTitle } from '@/components/ui/card';
<Card><CardContent><CardTitle>Title</CardTitle></CardContent></Card>
```

## Input — `src/components/ui/input.tsx`
- Exports: default memoized `Input`, `Input`
- Example:
```tsx
import { Input } from '@/components/ui/input';
<Input placeholder="Email" />
```

## Textarea — `src/components/ui/textarea.tsx`
- Exports: `Textarea`
- Example:
```tsx
import { Textarea } from '@/components/ui/textarea';
<Textarea rows={4} />
```

## Badge — `src/components/ui/badge.tsx`
- Exports: `Badge`, `badgeVariants`; `BadgeProps` interface
- Example:
```tsx
import { Badge } from '@/components/ui/badge';
<Badge variant="secondary">New</Badge>
```

## Tooltip — `src/components/ui/tooltip.tsx`
- Exports: `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`
- Example:
```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
<Tooltip>
  <TooltipTrigger asChild><button>?</button></TooltipTrigger>
  <TooltipContent>Help text</TooltipContent>
</Tooltip>
```

## Toast — `src/components/ui/toast.tsx` and `toaster.tsx`
- `toast.tsx` exports action and content pieces used by the hook system
- `toaster.tsx` exports `Toaster` container component
- Use with `useToast()` from hooks

## Other UI
- Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Breadcrumb, Calendar, Carousel, Checkbox, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input OTP, Label, Menubar, Navigation Menu, Pagination, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Toggle, Toggle Group, Tooltip.
- Each file re-exports the expected parts. Refer to component props in code if you need advanced usage.