import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import NewRow from "./NewRow_org";

const IndicatorsTable = ({ indicators = [] }) => {
    const [rows, setRows] = useState(() => {
        const lastIndicator = indicators[indicators.length - 1];
        return lastIndicator
            ? [{ id: Number(lastIndicator.ind_hierarchy) + 1 }]
            : [{ id: 1 }];
    });

    const addLevel = () => {
        const mainLevels = rows.filter((row) => !String(row.id).includes("."));
        const lastMainId = mainLevels.length
            ? parseInt(mainLevels[mainLevels.length - 1].id)
            : 0;
        const newId = lastMainId + 1;
        setRows([...rows, { id: newId }]);
    };

    const [indSettings, setIndSettings] = useState([]);
    const [indAlignments, setIndAlignments] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const [indSettings, indAlignments] = await Promise.all([
                    fetch("/api/indicators/settings").then((res) => res.json()),
                    fetch("/api/indicators/alignments").then((res) =>
                        res.json()
                    ),
                ]);
                setIndSettings(indSettings);
                setIndAlignments(indAlignments);
            } catch (error) {
                console.error("Failed to fetch group data:", error);
            }
        };

        fetchGroups();
    }, []);

    return (
        <>
            <Table className="border-collapse whitespace-nowrap h-60">
                <TableHeader className="bg-gray-100 sticky top-0">
                    <TableRow className="text-xs text-gray-700 text-center">
                        <TableHead className="bg-white">{""}</TableHead>
                        <TableHead>No.</TableHead>
                        <TableHead>Indicators</TableHead>
                        <TableHead>Alignment of Indicators</TableHead>
                        <TableHead>Setting of Targets</TableHead>
                        <TableHead>Definitions or Examples</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {indicators.map((indicator) => (
                        <TableRow key={indicator.ind_id}>
                            <TableCell className="w-8">{""}</TableCell>
                            <TableCell>{indicator.ind_hierarchy}</TableCell>
                            <TableCell>{indicator.ind_name}</TableCell>
                            <TableCell>{indicator.tagged_alignments}</TableCell>
                            <TableCell>
                                {indicator.indicator_settings_name}
                            </TableCell>
                            <TableCell>{indicator.ind_definition}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                    ))}
                    {rows.map((row) => (
                        <NewRow
                            key={row.id}
                            row={row}
                            indSettings={indSettings}
                            indAlignments={indAlignments}
                            setRows={setRows}
                        />
                    ))}
                </TableBody>
            </Table>
            <Button
                onClick={addLevel}
                className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg"
            >
                + Add Level
            </Button>
        </>
    );
};

export default IndicatorsTable;
