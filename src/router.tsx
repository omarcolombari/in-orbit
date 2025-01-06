import { createBrowserRouter } from 'react-router'
import { SignInWithGithub } from './pages/sign-in-with-github'
import { Application } from './pages/application'
import { SignInWithGithubCallback } from './pages/sign-in-with-github-callback'
import { ProtectedRoute } from './auth/protected-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInWithGithub />,
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Application />
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth/github/callback',
    element: <SignInWithGithubCallback />,
  },
])
