"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import { cloneElement } from "react";

const EditDialog = ({ children, title, open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{`Edit ${title}`}</DialogTitle>
                    <DialogDescription>
                        Edit the form below to update the {title.toLowerCase()}{" "}
                        in the system.
                    </DialogDescription>
                </DialogHeader>
                {cloneElement(children, {
                    onSuccess: () => onOpenChange(false),
                })}
            </DialogContent>
        </Dialog>
    );
};

export default EditDialog;
