import AppLayout from "@/layouts/app-layout";
import * as React from "react";
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils"
import { useState } from 'react'
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
        title: 'Filieres',
        href: '/filiere',
    },
];

export default function Filiere({filiere}:any) {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
      designation: "",
      description: "",
    })
  
    function handleChange(e:any) {
      setValues(values => ({
        ...values,
        [e.target.id]: e.target.value,
      }))
    }
    
      function handleSubmit(e:any) {
        e.preventDefault()
        router.post('/create_filiere', values)
        window.onloadeddata
      }
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Filiere"/>
            <DrawerDialogDemo/>
            {/* Liste filières */}
            <Table 
                className={(
                    "mx-auto  mt-4 mb-8 max-w-lg items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                )}
            >
                <TableCaption className="caption-top">Liste des Filières</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {filiere.map((item:any) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.designation}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">edit</TableCell>
                    </TableRow>
                ))}
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

        </AppLayout>
    )

    function ProfileForm({ className }: React.ComponentProps<"form">) {
        return (
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
            <Label htmlFor="designation">Designation</Label>
            <Input type="text" name="designation" id="designation" placeholder="Saisir une filiere" value={values.designation} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input type="text" name="description" id="description" placeholder="Description pour la filiere" value={values.description} onChange={handleChange} />
            </div>
            <Button type="submit">Save Filiere</Button>
        </form>
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
                  <Button className="bg-sky-500 hover:bg-sky-700 sm:max-w-[100px] cursor-pointer" variant="outline">Add Filiere</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                      <DialogTitle>Enregistrer une filière</DialogTitle>
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