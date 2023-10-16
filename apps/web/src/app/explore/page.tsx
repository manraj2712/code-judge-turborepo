"use client";
import Calendar from "@/components/explore/calendar";
import FiltersSidebar from "@/components/explore/filters-sidebar";
import ProblemsList from "@/components/explore/problems-list";

export default function Sidebar() {
  return (
    <div className="flex">
      <FiltersSidebar />
      <ProblemsList />
      <Calendar />
    </div>
  );
}
