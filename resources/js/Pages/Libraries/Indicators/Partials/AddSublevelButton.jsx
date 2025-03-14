import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const AddSublevelButton = ({ rows, hierarchy }) => {
    const [subLevelId, setSubLevelId] = useState("");
    const { data, setData, post } = useForm({ ind_hierarchy: "" });
    useEffect(() => {
        if (subLevelId) {
            setData("ind_hierarchy", subLevelId);
        }
    }, [subLevelId]);

    useEffect(() => {
        if (data.ind_hierarchy) {
            handleSubmit(data.ind_hierarchy);
        }
    }, [data.ind_hierarchy]);

    const addSublevel = (e) => {
        e.preventDefault();

        const hierarchyStr = String(hierarchy || "");

        const subLevels = rows.filter((row) =>
            String(row.ind_hierarchy).startsWith(hierarchyStr + ".")
        );

        const lastSubId = subLevels.length
            ? subLevels[subLevels.length - 1].ind_hierarchy
            : `${hierarchyStr}.0`;

        const lastNumber = parseInt(lastSubId.split(".").pop() || "0");
        const newId = `${hierarchyStr}.${lastNumber + 1}`;
        setSubLevelId(newId);
    };

    const handleSubmit = (newId) => {
        post("/libraries/indicators/add-sublevel", {
            data: { ind_hierarchy: newId }, // Ensure correct data is passed
            preserveScroll: true,
            onSuccess: () => {
                console.log("Sublevel added successfully!");
                setSubLevelId("");
                setData("ind_hierarchy", "");
            },
            onError: (errors) => {
                console.error("Submission failed:", errors);
            },
        });
    };

    return (
        <>
            <button
                onClick={addSublevel}
                className="text-sm text-blue-500 w-auto"
            >
                +
            </button>
        </>
    );
};

export default AddSublevelButton;
