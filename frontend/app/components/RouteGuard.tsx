"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

/**
 * Wraps protected pages. Redirects to /login if unauthenticated,
 * or to /unauthorized if the user's role is not allowed.
 */
export default function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const { user, accessToken } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Ensure client-side hydration for Zustand storage
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!accessToken) {
      router.replace("/login");
      return;
    }
    
    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [user, accessToken, mounted, allowedRoles, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!accessToken) return null;
  if (user && allowedRoles && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
