"use client"

import * as React from "react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "./ui/badge"
import TruevalueEditFormModal from "./truevalue-form-modal-edit";
import TruevalueCreateFormModal from "./truevalue-form-modal-create";
import { deleteTruevalueModel, getAllTruevalueModels } from "@/services/truevalue";
import { set } from "react-hook-form";
import { ConfirmDeleteModelDialog } from "./confirm-delete-model-dialog";

// export const data: TrueValueModel[] = [
//     {
//         id: "m1",
//         modelName: "Swift Dzire",
//         description: "Compact sedan with great mileage",
//         make: "Maruti Suzuki",
//         year: 2022,
//         variant: "ZXi Plus",
//         color: "Pearl Arctic White",
//         createdAt: "2025-07-11T10:45:00Z",
//         imageId: "img1",
//     },
//     {
//         id: "m2",
//         modelName: "Baleno",
//         description: "Premium hatchback with modern features",
//         make: "Maruti Suzuki",
//         year: 2021,
//         variant: "Alpha CVT",
//         color: "Nexa Blue",
//         createdAt: "2025-07-11T12:15:00Z",
//         imageId: "img2",
//     },
//     {
//         id: "m3",
//         modelName: "Alto 800",
//         description: "Entry-level hatchback with high fuel efficiency",
//         make: "Maruti Suzuki",
//         year: 2020,
//         variant: "VXi",
//         color: "Silver",
//         createdAt: "2025-07-10T09:30:00Z",
//         imageId: "img3",
//     },
//     {
//         id: "m4",
//         modelName: "WagonR",
//         description: "Tallboy hatchback with spacious interiors",
//         make: "Maruti Suzuki",
//         year: 2023,
//         variant: "ZXi AMT",
//         color: "Magma Grey",
//         createdAt: "2025-07-09T17:00:00Z",
//         imageId: "img4",
//     },
//     {
//         id: "m5",
//         modelName: "Celerio",
//         description: "Compact hatch with AGS technology",
//         make: "Maruti Suzuki",
//         year: 2022,
//         variant: "ZXi AMT",
//         color: "Solid Fire Red",
//         createdAt: "2025-07-08T14:20:00Z",
//         imageId: "img5",
//     },
//     {
//         id: "m6",
//         modelName: "Ertiga",
//         description: "7-seater MPV for families",
//         make: "Maruti Suzuki",
//         year: 2021,
//         variant: "ZXi Plus AT",
//         color: "Oxford Blue",
//         createdAt: "2025-07-08T09:10:00Z",
//         imageId: "img6",
//     },
//     {
//         id: "m7",
//         modelName: "Brezza",
//         description: "Compact SUV with powerful petrol engine",
//         make: "Maruti Suzuki",
//         year: 2023,
//         variant: "ZXi Plus AT",
//         color: "Sizzling Red with Black Roof",
//         createdAt: "2025-07-07T11:30:00Z",
//         imageId: "img7",
//     },
//     {
//         id: "m8",
//         modelName: "Ignis",
//         description: "Urban compact SUV with bold styling",
//         make: "Maruti Suzuki",
//         year: 2020,
//         variant: "Alpha MT",
//         color: "Turquoise Blue",
//         createdAt: "2025-07-06T16:45:00Z",
//         imageId: "img8",
//     },
//     {
//         id: "m9",
//         modelName: "Ciaz",
//         description: "Premium sedan with spacious interiors",
//         make: "Maruti Suzuki",
//         year: 2021,
//         variant: "ZXi AT",
//         color: "Dignity Brown",
//         createdAt: "2025-07-06T13:50:00Z",
//         imageId: "img9",
//     },
//     {
//         id: "m10",
//         modelName: "Grand Vitara",
//         description: "Mid-size SUV with hybrid engine option",
//         make: "Maruti Suzuki",
//         year: 2023,
//         variant: "Alpha+ Strong Hybrid",
//         color: "Pearl Midnight Black",
//         createdAt: "2025-07-05T10:00:00Z",
//         imageId: "img10",
//     },
//     {
//         id: "m11",
//         modelName: "XL6",
//         description: "Premium 6-seater MPV with captain seats",
//         make: "Maruti Suzuki",
//         year: 2022,
//         variant: "Alpha+ AT",
//         color: "Splendid Silver",
//         createdAt: "2025-07-05T15:10:00Z",
//         imageId: "img11",
//     },
//     {
//         id: "m12",
//         modelName: "S-Presso",
//         description: "Mini SUV style hatchback",
//         make: "Maruti Suzuki",
//         year: 2020,
//         variant: "VXi+ AGS",
//         color: "Solid Sizzle Orange",
//         createdAt: "2025-07-04T18:00:00Z",
//         imageId: "img12",
//     },
//     {
//         id: "m13",
//         modelName: "Fronx",
//         description: "Compact crossover with turbo engine",
//         make: "Maruti Suzuki",
//         year: 2023,
//         variant: "Alpha Turbo 1.0",
//         color: "Earthen Brown",
//         createdAt: "2025-07-04T08:45:00Z",
//         imageId: "img13",
//     },
//     {
//         id: "m14",
//         modelName: "Jimny",
//         description: "Iconic 4x4 off-roader",
//         make: "Maruti Suzuki",
//         year: 2023,
//         variant: "Alpha AT",
//         color: "Kinetic Yellow",
//         createdAt: "2025-07-03T14:00:00Z",
//         imageId: "img14",
//     },
//     {
//         id: "m15",
//         modelName: "Swift",
//         description: "Sporty hatchback with peppy performance",
//         make: "Maruti Suzuki",
//         year: 2022,
//         variant: "ZXi Plus AMT",
//         color: "Solid Fire Red",
//         createdAt: "2025-07-03T10:30:00Z",
//         imageId: "img15",
//     },
// ];

export type Image = {
    id: string;
    url: string;
    alt?: string;
    createdAt: string;
}

export type TrueValueModel = {
    id: string;
    modelName: string;
    description?: string | null;
    make?: string | null;
    year?: number | null;
    variant?: string | null;
    color?: string | null;
    createdAt: string; // ISO Date string (can be Date if you prefer)
    imageId?: string | null;
    image?: Image | null;
};


export function DataTableDemo() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const [truevalueModels, setTruevalueModels] = useState<TrueValueModel[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [model, setModel] = useState<TrueValueModel | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const fetchTruevalueModels = async () => {
        try {
            const response = await getAllTruevalueModels();
            setTruevalueModels(response.data);
        } catch (error) {
            console.error('Failed to fetch queries', error);
        }
    };

    useEffect(() => {
        fetchTruevalueModels();
    }, []);

    const handleTrueValueModelEdit = (data: any) => {
        // setModelId(id);
        setModel(data);
        // setIsModalOpen(true);
        setIsEditModalOpen(true);
    };

    const handleTrueValueModelDelete = async (id?: string) => {
        if (!id) {
            console.warn("No model id provided for deletion");
            return;
        }

        try {
            await deleteTruevalueModel(id);
            console.log(`Model ${id} deleted successfully`);
            fetchTruevalueModels();
        } catch (error) {
            console.error("Failed to delete model:", error);
        }
    };


    const columns: ColumnDef<TrueValueModel>[] = [
        // {
        //     id: "select",
        //     // size: 10,
        //     // minSize: 10,
        //     maxSize: 40,
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && "indeterminate")
        //             }
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        // {
        //     accessorKey: "status",
        //     size: 10,
        //     minSize: 10,
        //     maxSize: 10,
        //     header: "Status",
        //     cell: ({ row }) => (
        //         <div className="capitalize">{row.getValue("status")}</div>
        //     ),
        // },
        {
            accessorKey: "id",
            size: 140,
            minSize: 140,
            maxSize: 140,
            header: "Id",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
        {
            accessorKey: "modelName",
            size: 200,
            minSize: 200,
            maxSize: 200,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="hover:bg-gray-50"
                    >
                        Name
                        <ArrowUpDown />
                    </Button>
                    // <div
                    //     className="flex gap-2"
                    //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    // >
                    //     Name
                    //     <ArrowUpDown />
                    // </div>
                )
            },
            cell: ({ row }) => <div>{row.getValue("modelName")}</div>,
        },
        // {
        //     accessorKey: "email",
        //     size: 240,
        //     minSize: 240,
        //     maxSize: 240,
        //     header: "Email",
        //     // header: ({ column }) => {
        //     //     return (
        //     //         <Button
        //     //             variant="ghost"
        //     //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //     //         >
        //     //             Email
        //     //             <ArrowUpDown />
        //     //         </Button>
        //     //     )
        //     // },
        //     cell: ({ row }) => <div>{row.getValue("email")}</div>,
        // },
        {
            accessorKey: "variant",
            size: 140,
            minSize: 140,
            maxSize: 140,
            header: "Variant",
            cell: ({ row }) => <div>{row.getValue("variant")}</div>,
        },
        {
            accessorKey: "color",
            size: 40,
            minSize: 40,
            maxSize: 40,
            header: "Color",
            cell: ({ row }) => <div>{row.getValue("color")}</div>,
        },
        {
            accessorKey: "year",
            size: 100,
            minSize: 100,
            maxSize: 100,
            header: "Year",
            cell: ({ row }) => <div>{row.getValue("year")}</div>,
        },
        {
            accessorKey: "make",
            size: 160,
            minSize: 160,
            maxSize: 160,
            header: "Make",
            // cell: ({ row }) => <div className="flex items-center justify-center text-xs bg-black p-1 text-white rounded-full">{row.getValue("source")}</div>,
            cell: ({ row }) => <Badge variant="default">{row.getValue("make")}</Badge>,
        },
        {
            accessorKey: "description",
            size: 160,
            minSize: 160,
            maxSize: 160,
            header: "Description",
            cell: ({ row }) => <div
                className="truncate"
                style={{
                    maxWidth: "160px", // to match the column size
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {row.getValue("description")}
            </div>,
        },
        // {
        //     accessorKey: "amount",
        //     size: 100,
        //     minSize: 100,
        //     maxSize: 100,
        //     header: () => <div className="text-right">Amount</div>,
        //     cell: ({ row }) => {
        //         const amount = parseFloat(row.getValue("amount"))

        //         // Format the amount as a dollar amount
        //         const formatted = new Intl.NumberFormat("en-US", {
        //             style: "currency",
        //             currency: "USD",
        //         }).format(amount)

        //         return <div className="text-right font-medium">{formatted}</div>
        //     },
        // },
        {
            accessorKey: "createdAt", // Make sure this key exists in your data
            size: 180,
            minSize: 160,
            maxSize: 200,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            // cell: ({ row }) => {
            //     const rawDate = row.getValue("formSubmissionDate") as string;
            //     const formatted = new Date(rawDate).toLocaleDateString("en-IN", {
            //         year: "numeric",
            //         month: "short",
            //         day: "numeric",
            //     });
            //     return <div className="text-sm text-muted-foreground">{formatted}</div>;
            // },
            cell: ({ row }) => {
                const rawDate = row.getValue("createdAt");
                if (!rawDate) return <div>-</div>; // null/undefined guard

                const date = new Date(rawDate as string);

                // Guard against "Invalid Date"
                if (isNaN(date.getTime())) return <div>Invalid Date</div>;

                const formattedDate = date.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });

                return <div>{formattedDate}</div>;
            }

        },

        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const model = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleTrueValueModelEdit(model)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                // onClick={() => handleTrueValueModelDelete(model.id)}
                                onClick={() => setIsDeleteDialogOpen(true)}
                                // className="flex justify-between items-center gap-2 text-red-600 hover:bg-red-200 focus:bg-red-100 hover:text-red-100 focus:text-red-700"
                                className="flex justify-between items-center gap-2 text-red-600 bg-red-100 focus:bg-red-200 hover:text-red-100 focus:text-red-700"
                            >
                                Delete
                                <Trash className="h-4 w-4 text-red-700" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        }
    ]


    const table = useReactTable({
        data: truevalueModels,
        // data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // 👇 Export to Excel handler
    // const handleExportExcel = () => {
    //     const exportData = queries.map(q => ({
    //         Id: q.id,
    //         Name: q.name,
    //         Email: q.email || "-",
    //         Mobile: q.mobile,
    //         Location: q.location,
    //         Message: q.message || "",
    //         Source: q.source,
    //         Date: new Date(q.createdAt).toLocaleDateString("en-IN", {
    //             year: "numeric",
    //             month: "short",
    //             day: "numeric",
    //         }),
    //     }));

    //     const worksheet = XLSX.utils.json_to_sheet(exportData);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Queries");
    //     XLSX.writeFile(workbook, "queries.xlsx");
    // };

    console.log("model at tabler:", model)

    return (
        <>
            <div className="w-full">
                <div className="flex items-center py-4 gap-4">
                    <Input
                        placeholder="Filter name..."
                        value={(table.getColumn("modelName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("modelName")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        {/* <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger> */}
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex w-full justify-end">
                        <Button variant="default" onClick={() => setIsCreateModalOpen(true)} className="cursor-pointer">
                            Add Model
                        </Button>
                    </div>
                </div>
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                // style={{ width: header.getSize() }}
                                                style={{ width: header.column.getSize() }}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    {/* <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div> */}
                    <div className="text-muted-foreground flex-1 text-sm">{truevalueModels?.length ?? 0} result(s)</div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <TruevalueCreateFormModal
                isOpen={isCreateModalOpen}
                onClose={() => { setIsCreateModalOpen(false) }}
                model={model}
                setModel={setModel}
                setTruevalueModels={setTruevalueModels}
            />
            <TruevalueEditFormModal
                isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false) }}
                model={model}
                setModel={setModel}
                setTruevalueModels={setTruevalueModels}
            />
            <ConfirmDeleteModelDialog
                model={model}
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                handleTrueValueModelDelete={handleTrueValueModelDelete}
            />
        </>
    )
}
