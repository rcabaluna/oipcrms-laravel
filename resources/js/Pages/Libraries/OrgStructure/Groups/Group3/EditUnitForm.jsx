import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import AddDialogFormField from "@/Components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const EditUnitForm = ({ unit, onSuccess }) => {
    const [loading, setLoading] = useState(true);
    const [group1, setGroup1] = useState([]);
    const [group2, setGroup2] = useState([]);

    const { data, setData, put, processing, errors } = useForm({
        group1code: unit?.group1code || "",
        group2code: unit?.group2code || "",
        group3name: unit?.group3name || "",
        group3code: unit?.group3code || "",
    });

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const [group1Data, group2Data] = await Promise.all([
                    fetch("/api/group1").then((res) => res.json()),
                    fetch("/api/group2").then((res) => res.json()),
                ]);
                setGroup1(group1Data);
                setGroup2(group2Data);
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
        put(route("org-structure.group3Update", unit), {
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
                    id="group3name"
                    label="Unit Name"
                    type="text"
                    value={data.group3name}
                    onChange={(e) => setData("group3name", e.target.value)}
                />
                <AddDialogFormField
                    id="group3code"
                    label="Unit Code"
                    type="text"
                    value={data.group3code}
                    onChange={(e) => setData("group3code", e.target.value)}
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

export default EditUnitForm;
