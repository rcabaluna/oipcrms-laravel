import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import AddDialogFormField from "@/Components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const EditDivisionForm = ({ division, onSuccess }) => {
    const [loading, setLoading] = useState(true);
    const [group1, setGroup1] = useState([]);
    const { data, setData, put, processing, errors } = useForm({
        group1code: division?.group1code || "",
        group2name: division?.group2name || "",
        group2code: division?.group2code || "",
    });

    useEffect(() => {
        setLoading(true);

        fetch("/api/group1")
            .then((res) => res.json())
            .then((data) => setGroup1(data))
            .catch((error) =>
                console.error("Failed to fetch Group 1 data:", error)
            )
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("org-structure.group2Update", division), {
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
                    id="group2name"
                    label="Division Name"
                    type="text"
                    value={data.group2name}
                    onChange={(e) => setData("group2name", e.target.value)}
                />
                <AddDialogFormField
                    id="group2code"
                    label="Division Code"
                    type="text"
                    value={data.group2code}
                    onChange={(e) => setData("group2code", e.target.value)}
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

export default EditDivisionForm;
