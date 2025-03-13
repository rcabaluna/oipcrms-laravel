"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import AddDialogFormField from "@/components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const EditAccountForm = ({ account, onSuccess }) => {
    const { data, setData, put, processing, errors } = useForm({
        useraccountid: account.useraccountid || "",
        username: account.username || "",
        password: "",
        is_active: account.is_active === 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("accounts.update", account), {
            data: { ...data },
            preserveScroll: true,
            onSuccess: onSuccess ? onSuccess : undefined,
            onError: (err) => console.error("Submission failed:", err),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <AddDialogFormField
                    id="username"
                    label="Username"
                    type="text"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                    error={errors.username}
                />
                <AddDialogFormField
                    id="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password}
                />
                <AddDialogFormField
                    id="is_active"
                    label="Is Active"
                    type="checkbox"
                    checked={data.is_active}
                    onCheckedChange={(value) => setData("is_active", value)}
                    error={errors.is_active}
                />
            </div>
            <DialogFooter>
                <Button disabled={processing} type="submit">
                    {processing ? "Submitting..." : "Submit"}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default EditAccountForm;
