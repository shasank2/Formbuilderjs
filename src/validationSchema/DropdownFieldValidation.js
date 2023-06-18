import * as Yup from 'yup';

export const dropDownSchema = Yup.object().shape({
  selectedState: Yup.object().shape({
    source: Yup.string(),
    apiUrl: Yup.string().when('source', {
      is: "url",
      then: () => Yup.string().required("URL is requried"),
      otherwise: () => Yup.string().notRequired(),
    }),
    options: Yup.array().of(Yup.object().shape({
      label: Yup.string().required('This field is required'),
      value: Yup.string().required('This field is required'),
    }))

    // options:
    //   Yup.string().when('source', {
    //     is: "options",
    //     then: () => Yup.array().of(Yup.object().shape({
    //       label: Yup.string().required('This field is required'),
    //       value: Yup.string().required('This field is required'),
    //     })),
    //     otherwise: () => Yup.string().notRequired(),
    //   })
  })
});
