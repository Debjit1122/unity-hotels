//@ts-nocheck
'use client'
import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Rooms from "./rooms";

export type Booking = {
    id: string;
    roomName: string;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfGuests: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    paymentStatus: "paid" | "pending" | "cancelled";
    amountPaid: number;
};

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "roomName",
        header: "Room Name",
        cell: ({ row }) => <div>{row.getValue("roomName")}</div>,
    },
    {
        accessorKey: "checkInDate",
        header: "Check-in Date",
        cell: ({ row }) => (
            <div>{new Date(row.getValue("checkInDate")).toLocaleDateString()}</div>
        ),
    },
    {
        accessorKey: "checkOutDate",
        header: "Check-out Date",
        cell: ({ row }) => (
            <div>{new Date(row.getValue("checkOutDate")).toLocaleDateString()}</div>
        ),
    },
    {
        accessorKey: "numberOfGuests",
        header: "Guests",
        cell: ({ row }) => <div>{row.getValue("numberOfGuests")}</div>,
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => <div>{row.getValue("paymentStatus")}</div>,
    },
    {
        accessorKey: "amountPaid",
        header: "Amount Paid",
        cell: ({ row }) => (
            <div>
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(row.getValue("amountPaid"))}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
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
];

const Dashboard = () => {
    const [data, setData] = React.useState<Booking[]>([]);

    React.useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('https://unity-hotels-api.vercel.app/api/bookings');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const bookings = await response.json();
            setData(bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const averageGuests =
        data.reduce((total, booking) => total + booking.numberOfGuests, 0) /
        data.length;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
            <Tabs defaultValue="bookings" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="rooms">
                        Rooms
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="bookings" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {/* Card 1: Total Bookings */}
                        <Card className="py-4">
                            <CardContent>
                                <CardDescription className="mb-4">Total Bookings</CardDescription>
                                <CardTitle>{data.length}</CardTitle>
                            </CardContent>
                        </Card>

                        {/* Card 2: Total Revenue */}
                        <Card className="py-4">
                            <CardContent>
                                <CardDescription className="mb-4">
                                    Total Revenue
                                </CardDescription>
                                <CardTitle>
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(
                                        data.reduce((total, booking) => total + parseFloat(booking.amountPaid), 0)
                                    )}
                                </CardTitle>
                            </CardContent>
                        </Card>

                        {/* Card 3: Pending Payments */}
                        <Card className="py-4">
                            <CardContent>
                                <CardDescription className="mb-4">
                                    Pending Payments
                                </CardDescription>
                                <CardTitle>{data.filter((booking) => booking.paymentStatus === "pending")
                                    .length}</CardTitle>
                            </CardContent>
                        </Card>
                        <Card className="py-4">
                            <CardContent>
                                <CardDescription className="mb-4">Average Guests per Booking</CardDescription>
                                <CardTitle>{averageGuests.toFixed(2)}</CardTitle>
                            </CardContent>
                        </Card>

                    </div>
                    {/* Search Input */}
                    <Input
                        placeholder="Search..."
                        className="mb-4"
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                    />

                    {/* Table Section */}
                    <div className="w-full">
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                );
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
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
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
                </TabsContent>
                <TabsContent value="rooms" className="space-y-4">
                    <Rooms />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Dashboard;
