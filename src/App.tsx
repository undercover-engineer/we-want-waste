import { CreditCard, FileCheck, LocationEdit, Truck } from "lucide-react"
import Stepper from "./components/Stepper"
import SkipSelection from "./components/Steps/Skip"

function App() {
  const steps=[
      {
          label: "Postcode",
          icon: ({ stroke, fill }: { stroke: string; fill: string }) => (
        <LocationEdit className="w-5 h-5" stroke={stroke} fill={fill} />
      ),
          content: <div>Postcode Content</div>
      },
      {
          label: "Select Skip",
          icon: ({ stroke, fill }: { stroke: string; fill: string }) => (
        <Truck className="w-5 h-5" stroke={stroke} fill={fill} />
      ),
          content: <SkipSelection/>
      },
      {
          label: "Permit Check",
          icon: ({ stroke, fill }: { stroke: string; fill: string }) => (
        <FileCheck className="w-5 h-5" stroke={stroke} fill={fill} />
      ),
          content: <div>Permit Check Content</div>
      },
      {
          label: "Payment",
          icon: ({ stroke, fill }: { stroke: string; fill: string }) => (
        <CreditCard className="w-5 h-5" stroke={stroke} fill={fill} />
      ),
          content: <div>Payment Content</div> 
      }
  ]
  return (
    <>
      <Stepper steps={steps} persistentKey="form-step"/>
    </>
  )
}

export default App
