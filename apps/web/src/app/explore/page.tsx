"use client";
import FiltersSidebar from "@/components/filters-sidebar";
import ProblemsList from "@/components/problems-list";

export default function Sidebar() {
  return (
    <div className="flex">
      <FiltersSidebar />
      <ProblemsList />
    </div>
  );
}
