import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import AddDialogFormField from "@/Components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";

const AddOfficeForm = ({ onSuccess }) => {
    const { data, setData, post, processing, errors } = useForm({
        group1name: "",
        group1code: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("org-structure.group1Store"), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                console.error("Submission failed:", errors);
            },
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

export default AddOfficeForm;
