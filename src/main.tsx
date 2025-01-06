import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './libs/react-query.ts'
import { RouterProvider } from 'react-router'
import { router } from './router.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="bottom-left" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
