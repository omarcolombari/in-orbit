import type { ReactNode } from 'react'
import { isAuthenticated } from './auth'
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/" />
  }

  return children
}
