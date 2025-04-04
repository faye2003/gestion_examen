import AppLayout from "@/layouts/app-layout";
import * as React from "react";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils"
import { useMediaQuery } from '@react-hook/media-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
  

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: '/cours',
    },
];


export default function Cours() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cours" />
            <DrawerDialogDemo />
            <Table 
                className={(
                    "mx-auto max-w-lg items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                )}
            >
                <TableCaption className="caption-top">Liste de Cours</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Une designation</TableCell>
                    <TableCell>Ici une description</TableCell>
                    <TableCell className="text-right">edit</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            <SonnerDemo />

        </AppLayout>
    );

"use client"

  function SonnerDemo() {
    return (
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    )
  }

}

function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
        
    <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button variant="outline">Add Cours</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Editer un Cours</DialogTitle>
                <DialogDescription>
                Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <ProfileForm />
            </DialogContent>
        </Dialog>
      </>
    )
  }

}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form method="post" className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="Designation">Designation</Label>
        <Input type="text" id="designation" defaultValue="Saisir un cours" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="Description">Description</Label>
        <Input type="text" id="description" defaultValue="Description pour le cours" />
      </div>
      <Button type="submit">Save Cours</Button>
    </form>
  )
}

  

