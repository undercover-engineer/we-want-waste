type WasteTypeFiltersProps = {
    wasteTypes: string[];
    selectedWasteTypes: string[];
    onSelect: (wasteType:string)=> void
}
export default function WasteTypeFilters({wasteTypes, selectedWasteTypes, onSelect}:WasteTypeFiltersProps) {
    return(
        <div className="flex flex-wrap gap-2">
            {wasteTypes.map((wasteType)=>(
                <button 
                key={wasteType}
                onClick={()=>onSelect(wasteType)}
                className={`px-3 py-1 rounded-3xl text-xs border-2 border-primary md:text-sm lg:text-[16px] ${selectedWasteTypes.includes(wasteType) ? "bg-primary" : "bg-white"}`}
                >
                 {wasteType}
                </button>
            ))}
        </div>
    )
}
