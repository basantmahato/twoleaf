"use client";

import React from "react";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-slate-200 animate-pulse rounded ${className}`} />
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr className="border-b border-slate-100 animate-pulse">
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-slate-200 rounded w-full" />
        </td>
      ))}
    </tr>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
