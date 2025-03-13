import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

const AddLevelButton = () => {
    const { post } = useForm();

    const addLevel = () => {
        post(route("indicators.addLevel"), {
            preserveScroll: true,
            onSuccess: () => {},
        });
    };

    return (
        <Button
            onClick={addLevel}
            className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg"
        >
            + Add Level
        </Button>
    );
};

export default AddLevelButton;
