import * as Yup from 'yup';

export const dropDownSchema = Yup.object().shape({
  selectedState: Yup.object().shape({
    source: Yup.string(),
    apiUrl: Yup.string().when('source', {
      is: "url",
      then: Yup.string().required("aoisjdiuahsd")
    }),
    // options: Yup.string().when('source', {
    //   is: "options",
    //   then: Yup.object().shape({
    //     label: Yup.string().required('This field is required'),
    //     value: Yup.string().required('This field is required'),
    //   }),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // apiUrl: Yup.string().required("aoisjdiuahsd")
  })
});
