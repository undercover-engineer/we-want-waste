import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WasteTypeFilters from "../WasteTypeFilters";
import { WASTE_TYPES } from "../../data";
import { Calendar } from "lucide-react";
import Skip from "../Skip";


export default function SkipSelection(){
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
        <div className="flex flex-col items-start ml-4 gap-y-4 text-sm 2xl:w-[70%] 2xl:mx-auto">
        <h1 className="font-bold text-lg md:text-2xl">Select the skip size that best suits you</h1>
        <div className="border-[1px] border-secondary rounded-md px-3 py-4 mb-2 md:px-4 md:py-5 flex">
        <div className="flex gap-x-0.5 items-center">
            <Calendar/>
            <label className="mr-2">Select a date </label>
        </div>
        <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelecteDate(date)}
            placeholderText="Choose Date"
            className="border-[1px] border-secondary rounded-md text-center datepicker-input px-2 py-1"
        />
        </div>
        <div>
            <WasteTypeFilters wasteTypes={WASTE_TYPES} selectedWasteTypes={selectedType} onSelect={handleSelectWasteType}/>
        </div>
        <Skip/>
        </div>
    )
}