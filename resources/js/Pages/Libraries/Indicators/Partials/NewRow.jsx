import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, CircleX } from "lucide-react";
import Select from "react-select";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import AddLevelButton from "./AddLevelButton";
import AddSublevelButton from "./AddSublevelButton";

const NewRow = ({ indicator, indAlignments, indSettings }) => {
    const [selectedAlignments, setSelectedAlignments] = useState([]);
    const indAlignmentsOptions = indAlignments.map((item) => ({
        value: item.indicators_alignment_id,
        label: item.indicators_alignment_name,
    }));

    const indSettingsOptions = [
        { value: "", label: "-" },
        ...indSettings.map((item) => ({
            value: item.indicator_settings_id,
            label: item.indicator_settings_name,
        })),
    ];

    const handleMultiSelect = (value) => {
        setSelectedAlignments(value);
        setData(
            "indicator_alignments_id",
            value.map((v) => v.value)
        );
    };
    return (
        <TableRow indicator={indicator.ind_id}>
            <TableCell className="px-1 py-0.5 text-center">
                <AddSublevelButton hierarchy={indicator.ind_hierarchy} />
            </TableCell>
            <TableCell className="px-1 py-0.5 text-center">
                {indicator.ind_hierarchy}
            </TableCell>
            <TableCell className="px-1 py-0.5"></TableCell>
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
            <TableCell className="px-1 py-0.5"></TableCell>
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
