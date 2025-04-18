"use client"
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth(Component: React.ComponentType) {
    return function ProtectedRoute() {
      const { user, loading } = useAuth();
      const router = useRouter();
  
      useEffect(() => {
        if (!loading && !user) {
          router.push('/login');
        }
      }, [user, loading, router]);
  
      if (loading) {
        return <div>Loading...</div>;
      }
  
      return user ? <Component /> : null;
    };
  }