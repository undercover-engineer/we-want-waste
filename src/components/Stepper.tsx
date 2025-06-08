import { useEffect, useState } from "react"

interface StepProps{
    label?: string
    icon: React.ReactNode
    content: React.ReactNode
}

interface StepperProps{
    steps: StepProps[],
    initialStep?: number,
    persistentKey?: string // for saving current step to local storage
    onStepChange?: (step:number)=> void
}

export default function Stepper({steps, initialStep=0, persistentKey, onStepChange}: StepperProps) {
   const [currentStep, setCurrentStep] = useState(initialStep)
   useEffect(()=>{
    if(persistentKey){
        const savedStep = localStorage.getItem(persistentKey)
        if(savedStep){
            setCurrentStep(Number(savedStep))
        }
    }
   }, [persistentKey]);

   // Save current step to local storage and notify parent component
   useEffect(()=>{
    if(persistentKey){
        localStorage.setItem(persistentKey, String(currentStep))
    }
    if(onStepChange){
        onStepChange(currentStep)
    }
   }, [ currentStep, persistentKey, onStepChange])

   const handleNext = () =>{
    if(currentStep < steps.length-1){
        setCurrentStep(currentStep + 1)
    }
   }

   const handlePrev = () =>{
    if(currentStep > 0){
        setCurrentStep(currentStep -1)
    }
   }
   return(
    <>
        <div className="flex justify-between my-10 mx-2.5">
            {steps.map((step, index) => {
                const isActiveStep = index <= currentStep;
                const isLast = index === steps.length - 1;
                return (
                    <div key={index} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={`${isActiveStep ? "bg-[#ffe288] border-[#ffce4a]" : "bg-[#dfdfdf] border-secondary"} border-2 rounded-full p-3`}>
                                {step.icon}
                            </div>
                            <span className="max-sm:hidden">{step.label}</span>
                        </div>
                        {!isLast && (
                            <div className={`h-0.5 w-9 ${index < currentStep ? "bg-[#ffce4a]" : "bg-secondary"} mx-2`} />
                        )}
                    </div>
                );
            })}
        </div>

   {/* Show Step Content */}
   <div className="text-center">{steps[currentStep].content}</div>

   {/* Navigation */}
   <div className="flex justify-center gap-5 mt-5">
    <button onClick={handlePrev} disabled={currentStep===0} className="border-2 border-primary rounded-md px-4 py-0.5">Prev</button>
    <button onClick={handleNext} disabled={currentStep=== steps.length-1} className="border-2 border-primary rounded-md  px-4 py-0.5">Next</button>
   </div>
</>
)
}