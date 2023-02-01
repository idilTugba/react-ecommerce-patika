import * as yup from "yup";

const validationSchema = yup.object().shape({
    email : yup.string("Geçerli bir email giriniz").email().required("Zorunlu alan."),
    password: yup.string("Min 5 karakter olmalıdır.").min(5).required("Zorunlu alan."),
})

export default validationSchema;