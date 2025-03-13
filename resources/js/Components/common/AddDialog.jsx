"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import { useState, cloneElement } from "react";

const AddDialog = ({ children, title }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>{`Add ${title}`}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{`Add New ${title}`}</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to add a new{" "}
                        {`${title.toLowerCase()}`} to the system.
                    </DialogDescription>
                </DialogHeader>
                {cloneElement(children, { onSuccess: () => setOpen(false) })}
            </DialogContent>
        </Dialog>
    );
};

export default AddDialog;
