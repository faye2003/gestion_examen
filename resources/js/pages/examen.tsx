import AppLayout from "@/layouts/app-layout";
import * as React from "react";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
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
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { start } from "repl";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Examens',
        href: '/examen',
    },
];

type RegisterForm = {
    titre: string;
    detail: string;
    date: string;
    cours_id: number;
};

export default function Examens({examens}:any) {

    function ProfileForm() {
        const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
          titre: '',
          detail: '',
          date: '',
          cours_id: 0,
        });
     
        const submit: FormEventHandler = (e) => {
          e.preventDefault()
            post('/add_examen', {
                onFinish: () => reset('titre', 'detail', 'date', 'cours_id'),
            });
        };

        return (
           <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="titre">Titre</Label>
                        <Input
                            id="titre"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="titre"
                            value={data.titre}
                            onChange={(e) => setData('titre', e.target.value)}
                            disabled={processing}
                            placeholder="Titre"
                        />
                    </div>
    
                    <div className="grid gap-2">
                        <Label htmlFor="detail">Detail</Label>
                        <Input
                            id="detail"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="detail"
                            value={data.detail}
                            onChange={(e) => setData('detail', e.target.value)}
                            disabled={processing}
                            placeholder="Detail"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            required
                            tabIndex={2}
                            autoComplete="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            disabled={processing}
                            placeholder="Date"
                        />
                    </div>
                    {/* https://stackoverflow.com/questions/50645353/filter-on-a-mat-select */}
                    <div className="grid gap-2">
                        <Label htmlFor="cours_id">cours_id</Label>
                        <Input
                            id="cours_id"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="cours_id"
                            value={data.cours_id}
                            disabled={processing}
                            placeholder="cours_id"
                        />
                    </div>
                    <Button type="submit" className="mt-2 w-full cursor-pointer" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Enregistrer
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Examens" />
            <DrawerDialogDemo/>
            <Table 
                className={(
                    "mx-auto mt-2 mb-8 max-w-lg items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                )}
            >
                <TableCaption className="caption-top">Liste Examens</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>detail</TableHead>
                    <TableHead>date</TableHead>
                    <TableHead>cours_id</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {examens.map((item:any) => (
                    <TableRow>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.titre}</TableCell>
                    <TableCell>{item.detail}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.cours_id}</TableCell>
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
    );

    function DrawerDialogDemo() {
        const [open, setOpen] = React.useState(false)
        const isDesktop = useMediaQuery("(min-width: 768px)")
        
        if (isDesktop) {
            return (
                
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="ms-auto mt-4 mr-8 mb-4" asChild>
                    <Button className="bg-sky-500 hover:bg-sky-700 sm:max-w-[100px] cursor-pointer" variant="outline">Ajouter</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Ajouter un étudiant</DialogTitle>
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
