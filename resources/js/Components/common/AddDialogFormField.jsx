import { Label } from "@/Components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/Components/ui/select";
import { Checkbox } from "@/Components/ui/checkbox";

const AddDialogFormField = ({
    id,
    label,
    type = "text",
    options = [],
    ...props
}) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={id} className="text-right">
                {label}
            </Label>

            {type === "text" && (
                <Input id={id} type="text" className="col-span-3" {...props} />
            )}

            {type === "password" && (
                <Input
                    id={id}
                    type="password"
                    className="col-span-3"
                    {...props}
                />
            )}

            {type === "select" && (
                <Select {...props}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={`Select ${label}`} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key={null} value={null}>
                            {"-"}
                        </SelectItem>
                        {options.map((option) => {
                            const xvalue =
                                option.group3code ||
                                option.group2code ||
                                option.group1code ||
                                option.value;
                            const optionLabel =
                                option.group3name ||
                                option.group2name ||
                                option.group1name ||
                                option.label;

                            return (
                                <SelectItem key={xvalue} value={xvalue}>
                                    {optionLabel}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            )}

            {type === "checkbox" && (
                <div className="col-span-3 flex items-center">
                    <Checkbox id={id} {...props} />
                </div>
            )}
        </div>
    );
};

export default AddDialogFormField;
