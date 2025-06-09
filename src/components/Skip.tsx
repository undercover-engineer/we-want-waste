import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface SkipProps {
  id: number;
  size: number;
  hire_period_days: string;
  price_before_vat: number;
}

const getSkips = async (): Promise<SkipProps[]> => {
  const res = await fetch(
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch skips");
  }
  const data = res.json();
  console.log(data)
  return data
}

export default function Skip() {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

  const {
    data: skips,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["skips", "NR32", "Lowestoft"],
    queryFn: getSkips,
  });

  if (isLoading) return <p>Loading skips...</p>;
  if (isError) return <p className="text-red-500">Failed to load skips.</p>;

  return (
    <div className="w-full">

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 xl:gap-4 pr-4">
        {skips && skips.map((skip: SkipProps) => (
            <div
            key={skip.id}
            className="shadow-lg rounded-xl py-4 px-2 md:px-6 lg:px-9 xl:px-12 flex flex-col h-full"
            >
            <div>
              <img src="/assets/skip-bin.png" alt="image of a Skip"/>
            </div>
            <div className="flex flex-col justify-between items-start mt-4 md:flex-row md:items-center md:w-11/12 md:mx-auto">
              <div className="text-lg md:text-xl xl:text-2xl text-yellow-500 font-bold mb-1">
              {`${skip.size} Yard Skip`}
              </div>
              <p className="text-sm md:text-[15px] xl:text-[16px] text-gray-400">
              {`${skip.hire_period_days} Day Hire`}
            </p>
            </div>

            <p className="text-sm md:text-[16px] text-gray-400 mb-4 text-left mt-2 md:w-11/12 md:mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam.
            </p>

            <div className="text-lg md:py-2 font-semibold bg-yellow-500 rounded-md text-black md:w-11/12  md:mx-auto">
              £{skip.price_before_vat}
            </div>

            <button
              onClick={() => setSelectedSkipId(skip.id)}
              className={`mt-3 px-4 py-1.5 lg:py-2 rounded-md text-sm font-medium transition-all md:w-11/12 md:mx-auto ${
              selectedSkipId === skip.id
                ? "bg-primary"
                : "border-2 border-primary"
              }`}
            >
              {selectedSkipId === skip.id ? "Selected Skip" : "Select Skip"}
            </button>
            </div>
        ))}
      </div>
    </div>
  );
}
