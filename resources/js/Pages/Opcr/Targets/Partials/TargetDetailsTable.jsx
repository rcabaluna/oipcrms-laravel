import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/Components/ui/input";
import { router } from "@inertiajs/react";

const TargetDetailsTable = ({ targetdetails }) => {
    const [data, setData] = useState(targetdetails);

    const handleChange = (field, value, id) => {
        const updatedData = data.map((item) =>
            item.targetdetailsid === id ? { ...item, [field]: value } : item
        );
        setData(updatedData);

        saveData(id, value); // Save immediately on change
    };

    const saveData = (id, value) => {
        router.put(
            route("opcr.targets.details.value.update", id), // Correctly inject ID into route
            {
                xvalue: value,
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No.</TableHead>
                    <TableHead>Indicators</TableHead>
                    <TableHead>Alignment of Indicators</TableHead>
                    <TableHead>Setting of Targets</TableHead>
                    <TableHead>Definitions or Examples</TableHead>
                    <TableHead>Target</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((details, index) => (
                    <TableRow key={details.targetdetailsid}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="w-[300px]">
                            {details.ind_name}
                        </TableCell>
                        <TableCell className="w-[200px]">
                            {details.indicators_alignment}
                        </TableCell>
                        <TableCell className="w-[200px]">
                            {details.indicator_settings_name}
                        </TableCell>
                        <TableCell className="w-[400px] text-sm">
                            {details.ind_definition}
                        </TableCell>
                        <TableCell className="w-24">
                            <Input
                                type="number"
                                value={details.xvalue}
                                onChange={(e) =>
                                    handleChange(
                                        "xvalue",
                                        e.target.value,
                                        details.targetdetailsid
                                    )
                                }
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TargetDetailsTable;
