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
            colorClass = 'text-gray-200';
            break;
        case PriorityType.MEDIUM:
            colorClass = 'text-blue-400';
            break;
        case PriorityType.HIGH:
            colorClass = 'text-amber-300';
            break;
        case PriorityType.URGENT:
            colorClass = 'text-red-500';
            break;
        default:
            colorClass = '';
    }

    return (
        <Circle className={colorClass} size={24}/>
    );
};

export default PriorityIcon;