import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CircleX, Save } from "lucide-react";
import { useForm } from "@inertiajs/react";
import Select from "react-select";

const NewRow = ({ row, indSettings, indAlignments, setRows }) => {
    const [selectedAlignments, setSelectedAlignments] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        ind_hierarchy: row.id,
        ind_name: "",
        indicator_alignments_id: [],
        indicator_settings_id: "",
        ind_definition: "",
    });

    const indAlignmentsOptions = [
        ...indAlignments.map((item) => ({
            value: item.indicators_alignment_id,
            label: item.indicators_alignment_name,
        })),
    ];

    const indSettingsOptions = [
        { value: "", label: "-" }, // Add the default option at the start
        ...indSettings.map((item) => ({
            value: item.indicator_settings_id,
            label: item.indicator_settings_name,
        })),
    ];

    // Adding sublevel row
    const addSublevel = (parentId) => {
        setRows((prevRows) => {
            const subLevels = prevRows.filter((row) =>
                String(row.id).startsWith(parentId + ".")
            );

            const lastSubId = subLevels.length
                ? subLevels[subLevels.length - 1].id
                : `${parentId}.0`;

            const lastNumber = parseInt(lastSubId.split(".").pop() || "0");
            const newId = `${parentId}.${lastNumber + 1}`;

            const parentIndex = prevRows.findIndex(
                (row) => row.id === parentId
            );
            const insertIndex = parentIndex + subLevels.length + 1;

            return [
                ...prevRows.slice(0, insertIndex),
                { id: newId },
                ...prevRows.slice(insertIndex),
            ];
        });
    };

    // Handling form field changes
    const handleChange = (field, value) => {
        setData(field, value);
    };

    // Handling multi-select (Alignments)
    const handleMultiSelect = (value) => {
        setSelectedAlignments(value);
        setData(
            "indicator_alignments_id",
            value.map((v) => v.value)
        ); // Ensure value is properly mapped
    };

    // Handle form submission
    const handleSubmit = () => {
        post(route("indicators.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    ind_hierarchy: row.id,
                    ind_name: "",
                    indicator_alignments_id: [],
                    indicator_settings_id: "",
                    ind_definition: "",
                });
                setSelectedAlignments([]);
                row.id = Number(row.id) + 1;
            },
            onError: (errors) => {
                console.error("Submission failed:", errors);
            },
        });
    };

    // Handle remove row logic
    const handleRemove = () => {
        // Logic for removing the row can go here
        console.log("Removing row with ID: ", row.id);
        setRows((prevRows) => prevRows.filter((r) => r.id !== row.id)); // Remove row by id
    };

    return (
        <TableRow key={row.id}>
            <TableCell className="px-1 py-0.5 text-center">
                <button
                    onClick={() => addSublevel(row.id)}
                    className="text-xs text-blue-500 hover:underline w-8"
                >
                    +
                </button>
            </TableCell>
            <TableCell className="px-1 py-0.5 text-center">
                <Input defaultValue={row.id} className="w-16" />
            </TableCell>
            <TableCell className="px-1 py-0.5">
                <Input
                    placeholder="Enter indicator"
                    value={data.ind_name}
                    onChange={(e) => handleChange("ind_name", e.target.value)}
                />
            </TableCell>
            <TableCell className="px-1 py-0.5 relative">
                <Select
                    isMulti
                    name="indicator_alignments_id"
                    options={indAlignmentsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={selectedAlignments}
                    onChange={handleMultiSelect}
                />
            </TableCell>
            <TableCell className="px-1 py-0.5">
                <Select
                    name="indicator_settings_id"
                    options={indSettingsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={indSettingsOptions.find(
                        (option) => option.value === data.indicator_settings_id
                    )}
                    onChange={(e) =>
                        handleChange("indicator_settings_id", e.value)
                    }
                />
            </TableCell>
            <TableCell className="px-1 py-0.5">
                <Textarea
                    placeholder="Enter definitions or examples"
                    value={data.ind_definition}
                    onChange={(e) =>
                        handleChange("ind_definition", e.target.value)
                    }
                />
            </TableCell>
            <TableCell>
                <div className="inline-flex space-x-2 items-center">
                    <Save
                        onClick={handleSubmit}
                        className="cursor-pointer h-10"
                    />
                    <CircleX
                        onClick={handleRemove}
                        className="cursor-pointer h-10 text-red-500"
                    />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default NewRow;
