import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WasteTypeFilters from "../WasteTypeFilters";
import { WASTE_TYPES } from "../../data";


export default function Skip(){
    const [selectedDate, setSelecteDate] = useState<Date | null>(null);
    const [selectedType, setSelectedType] = useState<string[]>([]);

    // Handler to add or remove wasteType from selectedType
    const handleSelectWasteType = (wasteType: string) => {
        setSelectedType(prev =>
            prev.includes(wasteType)
                ? prev.filter(type => type !== wasteType)
                : [...prev, wasteType]
        );
    };

    return(
        <div className="flex flex-col items-start ml-4 gap-y-4">
        <h1>Select the skip size that best suits you</h1>
        <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelecteDate(date)}
            placeholderText="📆 Select a date"
            className="border-2 border-secondary rounded-md px-2"
        />
        <div>
            <WasteTypeFilters wasteTypes={WASTE_TYPES} selectedWasteTypes={selectedType} onSelect={handleSelectWasteType}/>
        </div>
        </div>
    )
}