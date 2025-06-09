import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useStepperNavRef } from "../contexts";

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
   const navRef = useStepperNavRef();

  const {
    data: skips,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["skips", "NR32", "Lowestoft"],
    queryFn: getSkips,
  });

  const handleSelect = (id: number) => {
    setSelectedSkipId(id);
    setTimeout(() => {
      navRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  if (isLoading) return <p>Loading skips...</p>;
  if (isError) return <p className="text-red-500">Failed to load skips.</p>;

  return (
    <div className="w-full 3xl:w-10/12 ">

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 xl:gap-4 pr-4">
        {skips && skips.map((skip: SkipProps) => (
            <div
            key={skip.id}
            className="shadow-[0_0_5px_rgba(0,0,0,0.2)] rounded-xl py-4 px-2 md:px-6 xl:px-12 3xl:px-14 flex flex-col h-full"
            >
            <div>
              <img src="/assets/skip-bin.png" alt="image of a Skip"/>
            </div>
            <div className="flex flex-col justify-between items-start mt-4 md:flex-row md:items-center md:w-11/12 md:mx-auto">
              <div className="text-lg md:text-xl 2xl:text-2xl text-yellow-500 font-bold mb-1">
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
            <div className="flex items-center md:w-11/12  md:mx-auto justify-between">
            <div>
              <p className="text-sm md:text-lg font-semibold">
                £{skip.price_before_vat}
                <small className="font-extralight max-[520px]:hidden"> (excl VAT) </small>
              </p>
            </div>
            <button
              onClick={() => handleSelect(skip.id)}
              className={`px-1 md:px-2 py-1 xl:py-1.5 rounded-md md:text-[15px] font-medium transition-all md:w-fit ${
              selectedSkipId === skip.id
                ? "bg-primary"
                : "border-2 border-primary"
              }`}
            >
              {selectedSkipId === skip.id ? "Selected Skip" : "Select Skip"}
            </button>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
}
