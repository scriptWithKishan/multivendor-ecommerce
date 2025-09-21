import Link from "next/link";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface SidebarProps {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: SidebarProps) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              onClick={() => onOpenChange(false)}
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            {session.data?.user ? (
              <Link
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                href="/admin"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  onClick={() => onOpenChange(false)}
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                  href="/sign-in"
                >
                  Log in
                </Link>
                <Link
                  onClick={() => onOpenChange(false)}
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                  href="/sign-up"
                >
                  Start selling
                </Link>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
