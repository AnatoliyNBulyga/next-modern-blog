"use client";

import { IconType } from "react-icons";

interface ButtonProps {
    type?: 'button' | 'submit';
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    additionClasses?: string;
}

const Button: React.FC<ButtonProps> = ({
   type = 'button',
   label,
   onClick,
   disabled,
   outline,
   small,
   icon: Icon,
   additionClasses
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                transition
                ${!additionClasses && 'w-full'}
                ${outline ? 'bg-white' : 'bg-blue-600'}
                ${outline ? 'border-black' : 'border-blue-600'}
                ${outline ? 'text-black' : 'text-white'}
                ${small ? 'py-1' : 'py-3'}
                ${small ? 'text-sm' : 'text-semibold'}
                ${small ? 'font-light' : 'font-normal'}
                ${small ? 'border-[1px]' : 'border-2'}
                ${additionClasses}
            `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
                        absolute
                        left-4
                        top-3
                    "
                />
            )}
            {label}
        </button>
    );
};

export default Button;