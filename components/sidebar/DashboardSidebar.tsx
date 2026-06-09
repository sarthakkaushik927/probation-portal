"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/providers/sidebar-provider";

const ICON_MAP = {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  CalendarDays,
} as const;

export type IconName = keyof typeof ICON_MAP;

interface SidebarItem {
  href: string;
  title: string;
  iconName: IconName;
}

interface DashboardSidebarProps {
  title: string;
  items: SidebarItem[];
}

export default function DashboardSidebar({ title, items }: DashboardSidebarProps) {
  const { isOpen, setIsOpen, toggle } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
          onClick={toggle}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-full transform border-r bg-background p-6 transition-transform duration-300 ease-in-out md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:w-72 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-12 md:pt-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggle}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex-1 space-y-2">
            {items.map((item) => {
              const Icon = ICON_MAP[item.iconName];
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-4 text-base font-medium transition-colors md:py-3 md:text-sm",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-6 w-6 md:h-5 md:w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
