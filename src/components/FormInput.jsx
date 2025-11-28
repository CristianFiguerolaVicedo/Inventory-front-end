    import { Eye, EyeOff } from "lucide-react";
    import { useState } from "react";

    const FormInput = ({
    label,
    value,
    onChange,
    placeholder,
    type,
    isSelect,
    options,
    }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
        <label className="text-[16px] text-[#505746] mb-1">{label}</label>
        <div className="relative">
            {isSelect ? (
            <select
                value={value}
                onChange={(e) => onChange(e)}
                className="w-full bg-tranparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            >
                {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
            ) : (
            <input
                className="w-full bg-transparent outline-none border border-[#505746] rounded-md py-2 px-3 pr-10 text-[#505746] leading-tight focus:outline-none focus:border-[#505746]"
                type={
                type === "password" ? (showPassword ? "text" : "password") : type
                }
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
            />
            )}

            {type === "password" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                {showPassword ? (
                <Eye
                    size={20}
                    className="text-[#505746]"
                    onClick={toggleShowPassword}
                />
                ) : (
                <EyeOff
                    size={20}
                    className="text-[#949488]"
                    onClick={toggleShowPassword}
                />
                )}
            </span>
            )}
        </div>
        </div>
    );
    };

    export default FormInput;
