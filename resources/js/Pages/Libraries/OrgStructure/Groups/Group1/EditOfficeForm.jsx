import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import AddDialogFormField from "@/Components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";

const EditOfficeForm = ({ office, onSuccess }) => {
    const { data, setData, put, processing, errors } = useForm({
        group1name: office?.group1name || "",
        group1code: office?.group1code || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("org-structure.group1Update", office), {
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
                    id="group1name"
                    label="Office Name"
                    type="text"
                    value={data.group1name}
                    onChange={(e) => setData("group1name", e.target.value)}
                />
                <AddDialogFormField
                    id="group1code"
                    label="Office Code"
                    type="text"
                    value={data.group1code}
                    onChange={(e) => setData("group1code", e.target.value)}
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

export default EditOfficeForm;
