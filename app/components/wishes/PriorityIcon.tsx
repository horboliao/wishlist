import React from 'react';
import {Circle} from "lucide-react";
import {PriorityType} from "@/lib/type";

interface PriorityIconProps {
    priority: PriorityType
}
const PriorityIcon = ({priority}:PriorityIconProps) => {

    let colorClass: string;

    switch (priority) {
        case PriorityType.LOW:
            colorClass = 'bg-gray-200';
            break;
        case PriorityType.MEDIUM:
            colorClass = 'bg-blue-400';
            break;
        case PriorityType.HIGH:
            colorClass = 'bg-amber-300';
            break;
        case PriorityType.URGENT:
            colorClass = 'bg-red-500';
            break;
        default:
            colorClass = '';
    }

    return (
        <span class={`inline-block h-4 w-4 rounded-full mr-2 ${colorClass}`}></span>
    );
};

export default PriorityIcon;