// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-6">
          <h1 className="text-3xl font-bold mb-2">⚠️ Oops! Something went wrong</h1>
          <p className="text-gray-400 mb-4">We’re sorry, but something went wrong. Please try again or send us feedback.</p>
          <Button onClick={() => window.location.reload()} className="mb-3">
            Reload Page
          </Button>
          <a href="/feedback" className="text-sm text-blue-400 hover:underline">
            Send Feedback
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
