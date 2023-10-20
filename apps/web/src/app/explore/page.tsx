"use client";
import Calendar from "@/components/explore/calendar";
import FiltersSidebar from "@/components/explore/filters-sidebar";
import ProblemsList from "@/components/explore/problems-list";

export default function Sidebar() {
  return (
    <div className="flex mb-20">
      <FiltersSidebar />
      <ProblemsList />
      <div className="hidden xl:flex pr-2 mr-2">
        <Calendar />
      </div>
    </div>
  );
}
