import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import AddDialogFormField from "@/Components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";

const AddUserForm = ({ groups, onSuccess }) => {
    const { data, setData, post, processing, errors } = useForm({
        firstname: "",
        middlename: "",
        lastname: "",
        extension: "",
        position: "",
        group1code: "",
        group2code: "",
        group3code: "",
        is_head: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                if (onSuccess) {
                    onSuccess(); // Close the dialog if onSuccess is defined
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
                    id="firstname"
                    label="Firstname"
                    type="text"
                    value={data.firstname}
                    onChange={(e) => setData("firstname", e.target.value)}
                />
                <AddDialogFormField
                    id="middlename"
                    label="Middlename"
                    type="text"
                    value={data.middlename}
                    onChange={(e) => setData("middlename", e.target.value)}
                />
                <AddDialogFormField
                    id="lastname"
                    label="Lastname"
                    type="text"
                    value={data.lastname}
                    onChange={(e) => setData("lastname", e.target.value)}
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
                />
                <AddDialogFormField
                    id="position"
                    label="Position"
                    type="text"
                    value={data.position}
                    onChange={(e) => setData("position", e.target.value)}
                />
                <AddDialogFormField
                    id="group1code"
                    label="Office"
                    type="select"
                    value={data.group1code}
                    onValueChange={(value) => setData("group1code", value)}
                    options={groups.group1}
                />
                <AddDialogFormField
                    id="group2code"
                    label="Division"
                    type="select"
                    value={data.group2code}
                    onValueChange={(value) => setData("group2code", value)}
                    options={groups.group2}
                />
                <AddDialogFormField
                    id="group3code"
                    label="Unit"
                    type="select"
                    value={data.group3code}
                    onValueChange={(value) => setData("group3code", value)}
                    options={groups.group3}
                />
                <AddDialogFormField
                    id="is_head"
                    label="Is Head"
                    type="checkbox"
                    checked={data.is_head}
                    onCheckedChange={(value) => setData("is_head", value)}
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

export default AddUserForm;
