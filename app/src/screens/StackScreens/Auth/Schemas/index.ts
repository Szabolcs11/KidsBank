import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup.string().required("A felhasználónév kötelező!"),
    password: yup.string().required("A jelszó kötelező!")
})

export const registerSchema = yup.object().shape({
    username: yup.string().required("A felhasználónév kötelező!"),
    // email: yup.string().required("Az email cím kötelező!").email("Az email cím formátuma nem megfelelő!"),
    email: yup.string().required("Az email cím kötelező!"),
    password: yup.string().required("A jelszó kötelező!"),
    passwordagain: yup.string().required("A jelszó újra kötelező!").oneOf([yup.ref("password")], "A jelszavaknak egyezniük kell!"),
})

export const familyMembersSchema = yup.object().shape({
    nickname: yup.string().required("A becenév kötelező!"),
    birthDate: yup.date().required("A születési év kötelező!"),
    points: yup.number().required("A pontok száma kötelező!"),
})

export const updateFamilyMemberSchema = yup.object().shape({
    nickname: yup.string().required("A becenév kötelező!"),
    birthDate: yup.date().required("A születési év kötelező!"),
    points: yup.number().required("A pontok száma kötelező!"),
})