"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import AddDialogFormField from "@/components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const EditUserForm = ({ user, onSuccess }) => {
    const [group1, setGroup1] = useState([]);
    const [group2, setGroup2] = useState([]);
    const [group3, setGroup3] = useState([]);
    const [loading, setLoading] = useState(true); // Track API loading state

    const { data, setData, put, processing, errors } = useForm({
        firstname: user.firstname || "",
        middlename: user.middlename || "",
        lastname: user.lastname || "",
        extension: user.extension || "",
        position: user.position || "",
        group1code: user.group1code || "",
        group2code: user.group2code || "",
        group3code: user.group3code || "",
        is_head: user.is_head === 1,
    });

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const [group1Data, group2Data, group3Data] = await Promise.all([
                    fetch("/api/group1").then((res) => res.json()),
                    fetch("/api/group2").then((res) => res.json()),
                    fetch("/api/group3").then((res) => res.json()),
                ]);
                setGroup1(group1Data);
                setGroup2(group2Data);
                setGroup3(group3Data);
            } catch (error) {
                console.error("Failed to fetch group data:", error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchGroups();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("users.update", user), {
            data: { ...data },
            preserveScroll: true,
            onSuccess: onSuccess ? onSuccess : undefined,
            onError: (err) => console.error("Submission failed:", err),
        });
    };

    if (loading) {
        return <p className="text-center p-4">Fetching data...</p>; // Show loading state before form appears
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <AddDialogFormField
                    id="firstname"
                    label="Firstname"
                    type="text"
                    value={data.firstname}
                    onChange={(e) => setData("firstname", e.target.value)}
                    error={errors.firstname}
                />
                <AddDialogFormField
                    id="middlename"
                    label="Middlename"
                    type="text"
                    value={data.middlename}
                    onChange={(e) => setData("middlename", e.target.value)}
                    error={errors.middlename}
                />
                <AddDialogFormField
                    id="lastname"
                    label="Lastname"
                    type="text"
                    value={data.lastname}
                    onChange={(e) => setData("lastname", e.target.value)}
                    error={errors.lastname}
                />
                <AddDialogFormField
                    id="extension"
                    label="Extension"
                    type="select"
                    value={data.extension}
                    onValueChange={(value) => setData("extension", value)}
                    options={[
                        { value: "Sr", label: "Sr" },
                        { value: "Jr", label: "Jr" },
                        { value: "II", label: "II" },
                        { value: "III", label: "III" },
                        { value: "IV", label: "IV" },
                        { value: "V", label: "V" },
                    ]}
                    error={errors.extension}
                />
                <AddDialogFormField
                    id="position"
                    label="Position"
                    type="text"
                    value={data.position}
                    onChange={(e) => setData("position", e.target.value)}
                    error={errors.position}
                />
                <AddDialogFormField
                    id="group1code"
                    label="Office"
                    type="select"
                    value={data.group1code}
                    onValueChange={(value) => setData("group1code", value)}
                    options={group1}
                    error={errors.group1code}
                />
                <AddDialogFormField
                    id="group2code"
                    label="Division"
                    type="select"
                    value={data.group2code}
                    onValueChange={(value) => setData("group2code", value)}
                    options={group2}
                    error={errors.group2code}
                />
                <AddDialogFormField
                    id="group3code"
                    label="Unit"
                    type="select"
                    value={data.group3code}
                    onValueChange={(value) => setData("group3code", value)}
                    options={group3}
                    error={errors.group3code}
                />
                <AddDialogFormField
                    id="is_head"
                    label="Is Head"
                    type="checkbox"
                    checked={data.is_head}
                    onCheckedChange={(value) => setData("is_head", value)}
                    error={errors.is_head}
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

export default EditUserForm;
