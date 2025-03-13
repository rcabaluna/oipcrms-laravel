import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import AddDialogFormField from "@/Components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";

const AddUnitForm = ({ group, onSuccess }) => {
    const { data, setData, post, processing, errors } = useForm({
        group1code: "",
        group2code: "",
        group3name: "",
        group3code: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("org-structure.group3Store"), {
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
                    id="group1code"
                    label="Office"
                    type="select"
                    value={data.group1code}
                    onValueChange={(value) => setData("group1code", value)}
                    options={group.office}
                />
                <AddDialogFormField
                    id="group2code"
                    label="Division"
                    type="select"
                    value={data.group2code}
                    onValueChange={(value) => setData("group2code", value)}
                    options={group.division}
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
                    label="Division Code"
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

export default AddUnitForm;
