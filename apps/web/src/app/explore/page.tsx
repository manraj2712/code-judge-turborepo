"use client";
import FiltersSidebar from "@/components/FiltersSidebar";
import ProblemsList from "@/components/ProblemsList";

export default function Sidebar() {
  return (
    <div className="flex">
      <FiltersSidebar />
      <ProblemsList />
    </div>
  );
}
