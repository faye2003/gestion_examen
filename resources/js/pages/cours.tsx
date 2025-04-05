import AppLayout from "@/layouts/app-layout";
import * as React from "react";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage, useForm, router } from "@inertiajs/react";
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
import { useState } from 'react';
  

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: '/cours',
    },
];


export default function Cours() {
  const { errors } = usePage().props;

  function handleSubmit(e:any) {
    e.preventDefault()
    router.post('/')
  }


  errors ?
  <div className="bg-sky-400">{toast(errors.designation && <div>{errors.designation}</div>) && toast(errors.description && <div>{errors.description}</div>)}</div>
  :null 
 
  function ProfileForm({ className }: React.ComponentProps<"form">) {
    return (
      <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
          <Label htmlFor="designation">Designation</Label>
          <Input type="text" name="designation" id="designation" placeholder="Saisir un cours"/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input type="text" name="description" id="description" placeholder="Description pour le cours"/>
        </div>
        <Button type="submit">Save Cours</Button>
      </form>
    )
  }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cours" />
            <DrawerDialogDemo />
            <Table 
                className={(
                    "m-auto mt-4 mb-8 max-w-lg items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
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
            <Pagination className="mb-8">
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

  function DrawerDialogDemo() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
   
    if (isDesktop) {
      return (
          
        <>
          <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="ms-auto mt-8 mr-8 mb-8" asChild>
              <Button className="bg-sky-500 hover:bg-sky-700 sm:max-w-[100px] cursor-pointer" variant="outline">Add Cours</Button>
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

}



  

