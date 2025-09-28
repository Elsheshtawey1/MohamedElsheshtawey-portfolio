# Hooks

## `usePortfolioData()` — `src/hooks/usePortfolioData.ts`
- Returns:
  - `portfolioData: PortfolioData | null`
  - `projectsData: ProjectsData | null`
  - `loading: boolean`
  - `error: string | null`
- Example:
```tsx
import { usePortfolioData } from '@/hooks/usePortfolioData';

const Home = () => {
  const { portfolioData, projectsData, loading, error } = usePortfolioData();
  if (loading) return <div>Loading...</div>;
  if (error || !portfolioData || !projectsData) return <div>Error</div>;
  return (
    <>
      <Navigation data={portfolioData} />
      <Hero data={portfolioData} />
      <Projects data={portfolioData} projects={projectsData.projects} />
    </>
  );
};
```

## `useProject(projectId: string)` — `src/hooks/usePortfolioData.ts`
- Returns:
  - `project: Project | undefined`
  - `loading: boolean`
  - `error: string | null`
- Example:
```tsx
import { useParams } from 'react-router-dom';
import { useProject } from '@/hooks/usePortfolioData';

const ProjectDetail = () => {
  const { projectId = '' } = useParams();
  const { project, loading, error } = useProject(projectId);
  // ...
};
```

## `useIsMobile()` — `src/hooks/use-mobile.tsx`
- Returns: `boolean` — `true` if viewport < 768px.
- Example:
```tsx
import { useIsMobile } from '@/hooks/use-mobile';

const Example = () => {
  const isMobile = useIsMobile();
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
};
```

## Toast utilities — `src/hooks/use-toast.ts`
- Exports:
  - `useToast()` — returns `{ toasts, toast, dismiss }`
  - `toast(options)` — imperative API to show toasts
- Example:
```tsx
import { useToast } from '@/hooks/use-toast';

const SaveButton = () => {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ title: 'Saved', description: 'Your changes were saved.' })}>
      Save
    </button>
  );
};
```

Note: `src/components/ui/use-toast.ts` re-exports `{ useToast, toast }` from the hook.