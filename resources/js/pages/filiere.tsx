import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
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
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Filiere"/>
            {/* Liste filières */}
            <Table 
                className={(
                    "mx-auto max-w-lg items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
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
}