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

type filiereForm = {
    designation : string,
    description : string, 
}

export default function Filiere() {
    // const { auth } = usePage<SharedData>().props;

    // const {data, setData, patch, errors, } = useForm<Required<filiereForm>>({
    //     designation : '',
    //     description : '',
    // });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Filiere" />
            <Table>
                <TableCaption>Liste des Filières</TableCaption>
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
                    <TableCell className="font-medium">0001</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Master en Informatique Conception et Développement d'Applications</TableCell>
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

        </AppLayout>
    )
}