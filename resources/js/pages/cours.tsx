import AppLayout from "@/layouts/app-layout";
import * as React from "react";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils"
import { useMediaQuery } from '@react-hook/media-query';
import { z } from "Zod";
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
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
  

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: '/cours',
    },
];

type RegisterForm = {
  designation: string;
  description: string;
};


export default function Cours({cours}:any) {
  
  function ProfileForm() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
      designation: '',
      description: '',
    });
 
    const submit: FormEventHandler = (e) => {
      e.preventDefault()
        post('/', {
            onFinish: () => reset('designation', 'description'),
        });
    };
    return (
       <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                        id="designation"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="designation"
                        value={data.designation}
                        onChange={(e) => setData('designation', e.target.value)}
                        disabled={processing}
                        placeholder="Designaiton"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        type="text"
                        required
                        tabIndex={2}
                        autoComplete="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        disabled={processing}
                        placeholder="Description"
                    />
                </div>
                <Button type="submit" className="mt-2 w-full cursor-pointer" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Create account
                </Button>
            </div>
        </form>
    )
  }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cours" />
            <DrawerDialogDemo />
            <Table 
                className={(
                    "m-auto mt-2 mb-8 max-w-lg items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
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
                {cours.map((item:any) => 
                    <TableRow>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.designation}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">edit</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            <Pagination className="mb-4">
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
              <DialogTrigger className="ms-auto mt-4 mr-8 mb-4" asChild>
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



  

