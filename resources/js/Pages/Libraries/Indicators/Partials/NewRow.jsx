import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, CircleX } from "lucide-react";
import Select from "react-select";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useDebounce } from "react-use";
import AddSublevelButton from "./AddSublevelButton";

const NewRow = ({
    rows,
    indicator,
    indAlignmentsOptions,
    indSettingsOptions,
}) => {
    // Local copy of indicator data for editing
    const [data, setData] = useState(() => ({
        ...indicator,
        indicator_alignments_id: (indicator.tagged_alignments_idx ?? "")
            .split(",")
            .map((x) => parseInt(x.trim(), 10))
            .filter((x) => !isNaN(x)),
    }));

    // Set of fields that have changed
    const [changedFields, setChangedFields] = useState(new Set());

    // Multi-select display values
    const [selectedAlignments, setSelectedAlignments] = useState(() => {
        let taggedIdx = [];

        if (Array.isArray(indicator.tagged_alignments_idx)) {
            taggedIdx = indicator.tagged_alignments_idx;
        } else if (typeof indicator.tagged_alignments_idx === "string") {
            taggedIdx = indicator.tagged_alignments_idx
                .split(",")
                .map((x) => parseInt(x.trim(), 10))
                .filter((x) => !isNaN(x));
        }

        return indAlignmentsOptions.filter((opt) =>
            taggedIdx.includes(opt.value)
        );
    });

    // Handle input/select changes
    const handleChange = (column, value) => {
        setChangedFields((prev) => new Set(prev).add(column));
        setData((prev) => ({
            ...prev,
            [column]: value,
        }));
    };

    // Handle multi-select (alignment IDs)
    const handleMultiSelect = (value) => {
        const ids = value.map((v) => v.value);
        setSelectedAlignments(value);
        setChangedFields((prev) =>
            new Set(prev).add("indicator_alignments_id")
        );
        setData((prev) => ({
            ...prev,
            indicator_alignments_id: ids,
        }));
    };

    // Debounced auto-save for changed fields
    useDebounce(
        () => {
            if (changedFields.size === 0) return;

            const updatedData = {};
            changedFields.forEach((key) => {
                updatedData[key] = data[key];
            });

            console.log("Sending updated fields:", updatedData);

            router.put(route("indicators.update", data.ind_id), {
                updatedData,
            });

            setChangedFields(new Set());
        },
        300,
        [changedFields, data]
    );

    return (
        <TableRow indicator={data.ind_id}>
            <TableCell className="px-1 py-0.5 text-center">
                <AddSublevelButton rows={rows} hierarchy={data.ind_hierarchy} />
            </TableCell>
            <TableCell className="px-1 py-0.5 text-center">
                <Input
                    placeholder="Enter hierarchy"
                    value={data.ind_hierarchy ?? ""}
                    onChange={(e) =>
                        handleChange("ind_hierarchy", e.target.value)
                    }
                />
            </TableCell>
            <TableCell className="px-1 py-0.5">
                <Input
                    placeholder="Enter indicator"
                    value={data.ind_name ?? ""}
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
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                />
            </TableCell>
            <TableCell className="px-1 py-0.5">
                <Select
                    name="indicator_settings_id"
                    options={indSettingsOptions}
                    className="basic-single-select"
                    classNamePrefix="select"
                    value={indSettingsOptions.find(
                        (opt) => opt.value === data.indicator_settings_id
                    )}
                    onChange={(selected) =>
                        handleChange(
                            "indicator_settings_id",
                            selected?.value ?? ""
                        )
                    }
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                />
            </TableCell>
            <TableCell className="px-1 py-0.5">
                <Textarea
                    placeholder="Enter definitions or examples"
                    value={data.ind_definition ?? ""}
                    onChange={(e) =>
                        handleChange("ind_definition", e.target.value)
                    }
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
