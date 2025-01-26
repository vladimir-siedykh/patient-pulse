'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className='bg-background flex min-h-screen flex-col items-center justify-center p-4'>
          <div className='text-center'>
            <h1 className='text-destructive mb-4 text-4xl font-bold'>Oops! Something went wrong</h1>

            {/* Show error details only in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className='bg-destructive/10 mb-4 rounded-md p-4 text-left'>
                <p className='text-destructive font-mono text-sm'>
                  {error.message || 'An unexpected error occurred'}
                </p>
                {error.digest && (
                  <p className='text-muted-foreground mt-2 text-xs'>Error ID: {error.digest}</p>
                )}
              </div>
            )}

            <p className='text-muted-foreground mb-8'>
              We apologize for the inconvenience. Please try again.
            </p>

            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
              <Button
                variant='default'
                onClick={() => reset()}
                className='bg-primary text-primary-foreground hover:bg-primary/90'
              >
                Try Again
              </Button>

              <Button
                variant='outline'
                onClick={() => (window.location.href = '/')}
                className='border-primary text-primary hover:bg-primary/10'
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
