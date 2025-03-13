import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const AddSublevelButton = ({ hierarchy }) => {
    const { data, setData, post } = useForm({ ind_hierarchy: "" });

    const addSublevel = (e) => {
        e.preventDefault();

        const hierarchyStr = String(hierarchy || "");

        const subLevels = hierarchyStr.split(".");
        const lastSubId =
            subLevels.length > 1 ? subLevels[subLevels.length - 1] : "0";
        const lastNumber = parseInt(lastSubId) || 0;
        const newId = `${hierarchyStr}.${lastNumber + 1}`;

        setData("ind_hierarchy", newId);

        handleSubmit();
    };

    const handleSubmit = () => {
        post(route("indicators.addSubLevel"), data, {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success (e.g., display a success message or reset form)
                console.log("Sublevel added successfully!");
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
