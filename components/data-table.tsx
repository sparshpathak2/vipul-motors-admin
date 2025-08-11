"use client"

import * as React from "react";
import { useEffect, useState } from "react";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

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
import { getAllQueries } from "@/services/queries"

export const data: Query[] = [
    {
        id: "q1",
        name: "Ravi Sharma",
        email: "ravi@example.com",
        mobile: "9876543210",
        location: "Delhi",
        message: "Interested in service package",
        createdAt: "2025-07-11T10:45:00Z",
        source: "Car Service",
    },
    {
        id: "q2",
        name: "Sneha Verma",
        mobile: "9123456789",
        location: "Mumbai",
        message: "",
        createdAt: "2025-07-11T12:15:00Z",
        source: "Loan",
    },
    {
        id: "q3",
        name: "Arjun Mehta",
        email: "arjunm@gmail.com",
        mobile: "9988776655",
        location: "Bangalore",
        createdAt: "2025-07-10T09:30:00Z",
        source: "Test Drive",
    },
    {
        id: "q4",
        name: "Priya Singh",
        email: "priya.singh@example.com",
        mobile: "8899001122",
        location: "Hyderabad",
        message: "Need urgent response",
        createdAt: "2025-07-09T17:00:00Z",
        source: "Contact",
    },
    {
        id: "q5",
        name: "Karan Kapoor",
        email: "karan.kapoor@example.com",
        mobile: "9090909090",
        location: "Chandigarh",
        createdAt: "2025-07-08T14:20:00Z",
        source: "Insurance",
    },
    {
        id: "q6",
        name: "Divya Nair",
        mobile: "9876001234",
        location: "Kochi",
        message: "Looking for service details",
        createdAt: "2025-07-08T09:10:00Z",
        source: "Driving School",
    },
    {
        id: "q7",
        name: "Aditya Rao",
        email: "adityarao@example.com",
        mobile: "9000112233",
        location: "Pune",
        createdAt: "2025-07-07T11:30:00Z",
        source: "Pre Owned",
    },
    {
        id: "q8",
        name: "Neha Jain",
        email: "neha.jain@example.com",
        mobile: "9011223344",
        location: "Indore",
        message: "Wants callback",
        createdAt: "2025-07-06T16:45:00Z",
        source: "Road Assistance",
    },
    {
        id: "q9",
        name: "Vikram Das",
        email: "vikram.das@example.com",
        mobile: "9822334455",
        location: "Kolkata",
        createdAt: "2025-07-06T13:50:00Z",
        source: "Loan",
    },
    {
        id: "q10",
        name: "Anjali Bhat",
        mobile: "9988991122",
        location: "Jaipur",
        message: "Interested in car wash",
        createdAt: "2025-07-05T10:00:00Z",
        source: "Contact",
    },
    {
        id: "q11",
        name: "Harsh Gupta",
        mobile: "9877012345",
        location: "Lucknow",
        createdAt: "2025-07-05T15:10:00Z",
        source: "Test Drive",
    },
    {
        id: "q12",
        name: "Pooja Rani",
        mobile: "8765098765",
        location: "Agra",
        message: "Looking for loan options",
        createdAt: "2025-07-04T18:00:00Z",
        source: "Loan",
    },
    {
        id: "q13",
        name: "Nikhil Arora",
        mobile: "7788991122",
        location: "Amritsar",
        createdAt: "2025-07-04T08:45:00Z",
        source: "Insurance",
    },
    {
        id: "q14",
        name: "Meera Iyer",
        email: "meera.iyer@example.com",
        mobile: "8899445566",
        location: "Chennai",
        createdAt: "2025-07-03T14:00:00Z",
        source: "Pre Owned",
    },
    {
        id: "q15",
        name: "Tanmay Joshi",
        mobile: "9988776655",
        location: "Nagpur",
        createdAt: "2025-07-03T10:30:00Z",
        source: "Driving School",
    },
    {
        id: "q16",
        name: "Ruchi Saxena",
        mobile: "9876540001",
        location: "Noida",
        createdAt: "2025-07-02T09:00:00Z",
        source: "Car Service",
    },
    {
        id: "q17",
        name: "Raj Malhotra",
        mobile: "9009090909",
        location: "Gurgaon",
        createdAt: "2025-07-02T11:15:00Z",
        source: "Road Assistance",
    },
    {
        id: "q18",
        name: "Shreya Ghosh",
        mobile: "9123001230",
        location: "Patna",
        createdAt: "2025-07-01T16:20:00Z",
        source: "Contact",
    },
    {
        id: "q19",
        name: "Rohan Shetty",
        mobile: "9012345678",
        location: "Mangalore",
        createdAt: "2025-07-01T12:00:00Z",
        source: "Loan",
    },
    {
        id: "q20",
        name: "Kritika Yadav",
        mobile: "9876012345",
        location: "Bhopal",
        createdAt: "2025-06-30T13:50:00Z",
        source: "Test Drive",
    },
    {
        id: "q21",
        name: "Abhishek Tiwari",
        mobile: "7890456123",
        location: "Varanasi",
        createdAt: "2025-06-30T10:00:00Z",
        source: "Insurance",
    },
    {
        id: "q22",
        name: "Tanya Kapoor",
        mobile: "9988776654",
        location: "Rajkot",
        createdAt: "2025-06-29T17:30:00Z",
        source: "Driving School",
    },
    {
        id: "q23",
        name: "Yash Sharma",
        mobile: "9888777666",
        location: "Udaipur",
        createdAt: "2025-06-29T14:20:00Z",
        source: "Pre Owned",
    },
    {
        id: "q24",
        name: "Sanya Malhotra",
        mobile: "9090901234",
        location: "Surat",
        createdAt: "2025-06-28T09:30:00Z",
        source: "Road Assistance",
    },
    {
        id: "q25",
        name: "Manish Verma",
        mobile: "9011122233",
        location: "Dehradun",
        createdAt: "2025-06-28T15:45:00Z",
        source: "Car Service",
    },
    {
        id: "q26",
        name: "Isha Khanna",
        mobile: "9876501230",
        location: "Ahmedabad",
        createdAt: "2025-06-27T11:10:00Z",
        source: "Contact",
    },
    {
        id: "q27",
        name: "Deepak Sharma",
        mobile: "9112345678",
        location: "Kanpur",
        createdAt: "2025-06-27T13:00:00Z",
        source: "Test Drive",
    },
    {
        id: "q28",
        name: "Ritika Sinha",
        mobile: "8899776655",
        location: "Coimbatore",
        createdAt: "2025-06-26T10:20:00Z",
        source: "Loan",
    },
    {
        id: "q29",
        name: "Mohit Rawat",
        mobile: "9000111122",
        location: "Thrissur",
        createdAt: "2025-06-26T14:40:00Z",
        source: "Driving School",
    },
    {
        id: "q30",
        name: "Sonal Arora",
        mobile: "9988001122",
        location: "Guwahati",
        createdAt: "2025-06-25T16:30:00Z",
        source: "Insurance",
    },
];

export type Query = {
    id: string
    name: string
    email?: string
    mobile: string
    location: string
    message?: string
    createdAt: string // ISO format or readable string
    source: string
}

export const columns: ColumnDef<Query>[] = [
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
        accessorKey: "name",
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
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        size: 240,
        minSize: 240,
        maxSize: 240,
        header: "Email",
        // header: ({ column }) => {
        //     return (
        //         <Button
        //             variant="ghost"
        //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //         >
        //             Email
        //             <ArrowUpDown />
        //         </Button>
        //     )
        // },
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "mobile",
        size: 140,
        minSize: 140,
        maxSize: 140,
        header: "Mobile No",
        cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
    },
    {
        accessorKey: "location",
        size: 100,
        minSize: 100,
        maxSize: 100,
        header: "Location",
        cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
        accessorKey: "source",
        size: 160,
        minSize: 160,
        maxSize: 160,
        header: "Source",
        // cell: ({ row }) => <div className="flex items-center justify-center text-xs bg-black p-1 text-white rounded-full">{row.getValue("source")}</div>,
        cell: ({ row }) => <Badge variant="default">{row.getValue("source")}</Badge>,
    },
    {
        accessorKey: "message",
        size: 160,
        minSize: 160,
        maxSize: 160,
        header: "Message",
        cell: ({ row }) => <div
            className="truncate"
            style={{
                maxWidth: "160px", // to match the column size
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}
        >
            {row.getValue("message")}
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
        size: 4,
        minSize: 4,
        maxSize: 4,
        enableHiding: false,
        // header: "Options",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function DataTableDemo() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const [queries, setQueries] = useState<Query[]>([]);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await getAllQueries(); // response: GetAllQueriesResponse
                setQueries(response.data); // data is an array of Query
            } catch (error) {
                console.error('Failed to fetch queries', error);
            }
        };
        fetchQueries();
    }, []);


    const table = useReactTable({
        data: queries,
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

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
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
                <div className="text-muted-foreground flex-1 text-sm">{queries?.length} result(s)</div>
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
    )
}
