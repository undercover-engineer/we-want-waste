import { CreditCard, FileCheck, LocationEdit, Truck } from "lucide-react"
import Stepper from "./components/Stepper"
import Skip from "./components/Steps/Skip"

function App() {
  const steps=[
      {
          label: "Postcode",
          icon: <LocationEdit className="w-5 h-5" stroke="#676767" fill="#dfdfdf"/>,
          content: <div>Postcode Content</div>
      },
      {
          label: "Select Skip",
          icon: <Truck className="w-5 h-5" stroke="#676767" fill="#dfdfdf"/>,
          content: <Skip/>
      },
      {
          label: "Permit Check",
          icon: <FileCheck className="w-5 h-5" stroke="#676767" fill="#dfdfdf"/>,
          content: <div>Permit Check Content</div>
      },
      {
          label: "Payment",
          icon: <CreditCard className="w-5 h-5" stroke="#676767" fill="#dfdfdf"/>,
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
