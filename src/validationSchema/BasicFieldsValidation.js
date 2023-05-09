import * as Yup from 'yup';
import { DROPDOWN } from '../utils/componentTypes';
import { dropDownSchema } from "./DropdownFieldValidation"

export const basicValidationFunction = (formType) => {
  const BasicSchema = Yup.object().shape({
    label: Yup.string().required('This field is required'),
    name: Yup.string().required('This field is required'),

    isRequried: Yup.boolean(),
    validationMessage: Yup.string().when('isRequired', {
      is: true,
      then: ()=>Yup.string().required("This field is required"),
    })
  })
  // if (formType === DROPDOWN) {
  //   BasicSchema.concat(dropDownSchema)
  // }
  return BasicSchema
}

