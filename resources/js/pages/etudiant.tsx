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
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { start } from "repl";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Etudiants',
        href: '/etudiant',
    },
];

type RegisterForm = {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    date_naissance: string;
    filiere_id: number;
};

export default function Etudiant({etudiants, props, filieres}:any) {

    function ProfileForm() {
        const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
          prenom: '',
          nom: '',
          email: '',
          telephone: '',
          date_naissance: '',
          filiere_id: get_id_filiere(),
        });
     
        const submit: FormEventHandler = (e) => {
          e.preventDefault()
            post('/add_etudiant', {
                onFinish: () => reset('prenom', 'nom', 'email', 'telephone', 'date_naissance', 'filiere_id'),
            });
        };
        return (
           <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="prenom">Prenom</Label>
                        <Input
                            id="prenom"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="prenom"
                            value={data.prenom}
                            onChange={(e) => setData('prenom', e.target.value)}
                            disabled={processing}
                            placeholder="Prenom"
                        />
                    </div>
    
                    <div className="grid gap-2">
                        <Label htmlFor="nom">Nom</Label>
                        <Input
                            id="nom"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="nom"
                            value={data.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                            disabled={processing}
                            placeholder="Nom"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="Email"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="telephone">Telephone</Label>
                        <Input
                            id="telephone"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="telephone"
                            value={data.telephone}
                            onChange={(e) => setData('telephone', e.target.value)}
                            disabled={processing}
                            placeholder="Telephone"
                        />
                        <Select name="filiere_id">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filiere" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Filière</SelectLabel>
                                {filieres.map((filiere:any) => 
                                <SelectItem value={filiere.designation}>{filiere.designation}</SelectItem>
                                )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date_naissance">Date de naissance</Label>
                        <Input
                            id="date_naissance"
                            type="date"
                            required
                            tabIndex={2}
                            autoComplete="date_naissance"
                            value={data.date_naissance}
                            onChange={(e) => setData('date_naissance', e.target.value)}
                            disabled={processing}
                            placeholder="Date de naissance"
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
            <Head title="Etudiants" />
            <DrawerDialogDemo/>
            <Table 
                className={(
                    "mx-auto mt-4 mb-8 max-w-lg items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                )}
            >
                <TableCaption className="caption-top">Liste Etudiants</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Prenom</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telephone</TableHead>
                    <TableHead>Âge</TableHead>
                    <TableHead>Filiere</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {etudiants.map((item:any) => (
                    <TableRow>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.prenom}</TableCell>
                    <TableCell>{item.nom}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.telephone}</TableCell>
                    <TableCell>{age_fromDateOf_birthday(item.date_naissance) + " ans"}</TableCell>
                    <TableCell>{get_nameOf_filiere(item.filiere_id)}</TableCell>
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
    

    function get_id_filiere()
    {
        let i = 0;
        etudiants.map((itemfiliere:any) =>
            itemfiliere.id == itemfiliere.filiere_id ? i = itemfiliere.filiere_id : null
        );
        return i;
    }

    function get_nameOf_filiere(i:any): any
    {
        let name;
        filieres.map((itemfiliere:any) =>
            i == itemfiliere.id ? name = itemfiliere.designation : null
        );
        return name;
    }

    //calcul de l'âge à partir de la date de naissance
    function age_fromDateOf_birthday(dateOfBirth: any): number {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }
}