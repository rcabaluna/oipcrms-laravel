// IndicatorsTable.js
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AddLevelButton from "./AddLevelButton"; // Import AddLevelButton component
import NewRow from "./NewRow";
import IndicatorRow from "./IndicatorRow";

const IndicatorsTable = ({ indicators = [] }) => {
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <Table className="border-collapse whitespace-nowrap m">
                    <TableHeader className="bg-gray-100 sticky top-0">
                        <TableRow className="text-xs text-gray-700 text-center">
                            <TableCell className="bg-white">{""}</TableCell>
                            <TableCell>No.</TableCell>
                            <TableCell>Indicators</TableCell>
                            <TableCell>Alignment of Indicators</TableCell>
                            <TableCell>Setting of Targets</TableCell>
                            <TableCell>Definitions or Examples</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {indicators.map((indicator, index) =>
                            indicator.ind_is_saved ? (
                                <IndicatorRow
                                    key={indicator.id || index}
                                    indicator={indicator}
                                />
                            ) : (
                                <NewRow
                                    key={`new-row-${index}`}
                                    indicator={indicator}
                                    indAlignments={indAlignments}
                                    indSettings={indSettings}
                                />
                            )
                        )}
                    </TableBody>
                </Table>
                <AddLevelButton />
            </div>
        </div>
    );
};

export default IndicatorsTable;
