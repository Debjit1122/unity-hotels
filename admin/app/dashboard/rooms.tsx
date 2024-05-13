import React, { useEffect, useState } from "react";
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

export type Room = {
    id: string
    name: string
    description: string
    price: number
    area: number
    capacity: number
    beds: number
    bathrooms: number
}

export const columns: ColumnDef<Room>[] = [
    {
        id: "select",
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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => <div>{row.getValue("price")}</div>,
    },
    {
        accessorKey: "area",
        header: "Area",
        cell: ({ row }) => <div>{row.getValue("area")}</div>,
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
        cell: ({ row }) => <div>{row.getValue("capacity")}</div>,
    },
    {
        accessorKey: "beds",
        header: "Beds",
        cell: ({ row }) => <div>{row.getValue("beds")}</div>,
    },
    {
        accessorKey: "bathrooms",
        header: "Bathrooms",
        cell: ({ row }) => <div>{row.getValue("bathrooms")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const room = row.original

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
                            onClick={() => navigator.clipboard.writeText(room.id)}
                        >
                            Copy Room ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

const Rooms = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [capacity, setCapacity] = useState("");
    const [beds, setBeds] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [features, setFeatures] = useState([]);
    const [newFeature, setNewFeature] = useState("");
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [data, setData] = useState<Room[]>([]);
    const [slug, setSlug] = useState("");
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await fetch("https://unity-hotels-api.vercel.app/api/rooms");
                if (!response.ok) {
                    throw new Error("Failed to fetch room data");
                }
                const responseData = await response.json();
                const roomsData = responseData.rooms; // Extract rooms array from response
                setData(roomsData); // Set rooms data as state
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };

        fetchRoomData();
    }, []);


    const table = useReactTable({
        data,
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

    const handleAddFeature = () => {
        if (newFeature.trim() !== "") {
            setFeatures((prevFeatures) => [...prevFeatures, newFeature]);
            setNewFeature("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Prepare the room data to be sent to the API
        const roomData = {
            name,
            description,
            price: parseFloat(price),
            area: parseFloat(area),
            capacity: parseInt(capacity),
            beds: parseInt(beds),
            bathrooms: parseInt(bathrooms),
            features,
            slug
        };

        try {
            // Send a POST request to the API endpoint with the room data
            const response = await fetch("https://unity-hotels-api.vercel.app/api/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(roomData)
            });

            if (!response.ok) {
                throw new Error("Failed to add room");
            }

            // Handle successful response
            console.log("Room added successfully");

            // Optionally, you can reset the form fields or perform any other action after successful submission
            setName("");
            setDescription("");
            setPrice("");
            setArea("");
            setCapacity("");
            setBeds("");
            setBathrooms("");
            setFeatures([]);
            setNewFeature("");
            setSlug("");
        } catch (error) {
            // Handle errors
            console.error("Error adding room:", error);
        }
    };

    return (
        <div>
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

            {/* Form to add/edit room */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area:</label>
                    <input
                        type="text"
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity:</label>
                    <input
                        type="text"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="beds" className="block text-sm font-medium text-gray-700">Beds:</label>
                    <input
                        type="text"
                        id="beds"
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms:</label>
                    <input
                        type="text"
                        id="bathrooms"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features:</label>
                    <input
                        type="text"
                        id="features"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                    <button type="button" onClick={handleAddFeature} className="mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-900 focus:outline-none focus:bg-zinc-900">Add Feature</button>
                    <ul className="mt-2">
                        {features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug:</label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-zinc-800"
                    />
                </div>
                <Button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600" onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    );
};

export default Rooms;
