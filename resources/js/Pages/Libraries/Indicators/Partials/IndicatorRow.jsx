import React from "react";

const IndicatorRow = ({ indicator }) => {
    return (
        <TableRow key={indicator.ind_id}>
            <TableCell className="w-8">{""}</TableCell>
            <TableCell>{indicator.ind_hierarchy}</TableCell>
            <TableCell>{indicator.ind_name}</TableCell>
            <TableCell>{indicator.tagged_alignments}</TableCell>
            <TableCell>{indicator.indicator_settings_name}</TableCell>
            <TableCell>{indicator.ind_definition}</TableCell>
            <TableCell>{""}</TableCell>
        </TableRow>
    );
};

export default IndicatorRow;
