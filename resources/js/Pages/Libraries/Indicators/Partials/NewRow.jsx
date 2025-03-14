import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, CircleX } from "lucide-react";
import Select from "react-select";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import AddLevelButton from "./AddLevelButton";
import AddSublevelButton from "./AddSublevelButton";

const NewRow = ({
    rows,
    indicator,
    indAlignmentsOptions,
    indSettingsOptions,
}) => {
    const { data, setData } = useForm({
        ind_name: indicator.ind_name,
    });

    const [selectedAlignments, setSelectedAlignments] = useState([]);

    const handleMultiSelect = (value) => {
        setSelectedAlignments(value);
        setData(
            "indicator_alignments_id",
            value.map((v) => v.value)
        );
    };

    const handleChange = (column, value) => {
        console.log(column, value);
    };

    return (
        <TableRow indicator={indicator.ind_id}>
            <TableCell className="px-1 py-0.5 text-center">
                <AddSublevelButton
                    rows={rows}
                    hierarchy={indicator.ind_hierarchy}
                />
            </TableCell>
            <TableCell className="px-1 py-0.5 text-center">
                {indicator.ind_hierarchy}
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
                />
            </TableCell>
            <TableCell className="px-1 py-0.5">
                <Textarea
                    placeholder="Enter definitions or examples"
                    value={indicator.ind_definition}
                />
            </TableCell>
            <TableCell>
                <div className="inline-flex space-x-2 items-center">
                    <Save className="cursor-pointer h-10" />
                    <CircleX className="cursor-pointer h-10 text-red-500" />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default NewRow;
