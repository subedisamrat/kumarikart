// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// const CommonForm = ({
//   formControls,
//   formData,
//   setFormData,
//   onSubmit,
//   buttonText,
//   isButtonDisabled,
// }) => {
//   const renderInput = (getControlItem) => {
//     const value = formData[getControlItem.name] || "";
//     switch (getControlItem.componentType) {
//       case "input":
//         return (
//           <Input
//             className="w-full"
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: e.target.value,
//               })
//             }
//           />
//         );

//       case "select":
//         return (
//           <Select
//             onValueChange={(value) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: value,
//               })
//             }
//             value={value}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={getControlItem.placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options?.map((optionItem) => (
//                 <SelectItem key={optionItem.id} value={optionItem.id}>
//                   {optionItem.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         );

//       case "textarea":
//         return (
//           <Textarea
//             className="w-full"
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             value={value}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: e.target.value,
//               })
//             }
//           />
//         );

//       default:
//         return (
//           <Input
//             className="w-full"
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: e.target.value,
//               })
//             }
//           />
//         );
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-6">
//       {formControls?.map((controlItem) => (
//         <div key={controlItem.name} className="space-y-2">
//           <Label htmlFor={controlItem.name} className="text-gray-700">
//             {controlItem.label}
//           </Label>
//           {renderInput(controlItem)}
//         </div>
//       ))}
//       <Button
//         disabled={isButtonDisabled}
//         type="submit"
//         className="w-full bg-blue-600 hover:bg-blue-700"
//       >
//         {buttonText || "Submit"}
//       </Button>
//     </form>
//   );
// };

// export default CommonForm;

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isButtonDisabled,
}) => {
  const renderInput = (getControlItem) => {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            className="w-full"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(val) =>
              setFormData({
                ...formData,
                [getControlItem.name]: val,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        return (
          <select
            id={getControlItem.name}
            multiple
            value={formData[getControlItem.name] || []}
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              );
              setFormData({
                ...formData,
                [getControlItem.name]: selected,
              });
            }}
          >
            {getControlItem.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <Textarea
            className="w-full"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            className="w-full"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {formControls?.map((controlItem) => (
        <div key={controlItem.name} className="space-y-2">
          <Label htmlFor={controlItem.name} className="text-gray-700">
            {controlItem.label}
          </Label>
          {renderInput(controlItem)}
        </div>
      ))}
      <Button
        disabled={isButtonDisabled}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
