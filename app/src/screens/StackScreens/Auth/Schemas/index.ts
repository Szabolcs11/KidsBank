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

export const tasksSchema = yup.object().shape({
    ChildId: yup.number().required("A gyermek kötelező!"),
    Name: yup.string().required("A feladat neve kötelező!"),
    Deadline: yup.date().required("A határidő kötelező!"),
    Points: yup.number().required("A pontok száma kötelező!"),
});