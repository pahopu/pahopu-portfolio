"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import * as React from "react";

interface ResponsiveModalProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  content: React.ReactNode;
}

export function ResponsiveModal({
  children,
  title,
  description,
  content,
}: ResponsiveModalProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col overflow-hidden p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b shrink-0">
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-base mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6">{content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex flex-col h-dvh mt-0 rounded-none border-t-0">
        <DrawerHeader className="text-left px-4 py-4 border-b shrink-0 bg-background z-10">
          <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4">{content}</div>

        <DrawerFooter className="shrink-0 border-t px-4 py-4 bg-background">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
