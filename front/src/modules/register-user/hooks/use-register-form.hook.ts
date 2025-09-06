import { useRef, useState } from "react";
import type { RegisterModel } from "../domain/model/register-model";
import { RegisterForm } from "../domain/forms/register-user-form";
import { useAppDispatch, type AppState } from "@eventhub/store/store";
import { registerUserAction } from "../actions/register-user.action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
    function updateField<K extends keyof RegisterModel.Form>(field: K, value: RegisterModel.Form[K]) {
        const newState = registerForm.current.updateField(form, field, value)
        setForm(newState)

        const validation = registerForm.current.validate(newState);
        setErrors(validation.errors);
    }

    function assignRole(role: RegisterModel.Role) {
        const newState = registerForm.current.assignRole(form, role);
        setForm(newState);

        const validation = registerForm.current.validate(newState);
        setErrors(validation.errors);
    }

    function isSubmittable() {
        return registerForm.current.isSubmittable(form);
    }

    async function submit() {
        const ok = await dispatch(registerUserAction(form));
        if (ok) {
            navigate("/login");
        }
    }
    
    type AllowedRole = keyof typeof allowedRoles;
    type ValidationError = Partial<Record<keyof RegisterModel.Form, string>>;

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const allowedRoles = {
        organizer: "Organisateur",
        participant: "Participant",
    } as const;

    const registerForm = useRef(new RegisterForm());
    const [form, setForm] = useState<RegisterModel.Form>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: null
    });
    const [errors, setErrors] = useState<ValidationError>({});
    // const networkError = useSelector((state: AppState) => state.registerUser.error);

    return {
        form,
        allowedRoles: (Object.entries(allowedRoles) as [AllowedRole, string][]).map(([role, label], idx) => ({
            id: idx,
            title: label,
            role
        })),
        errors,
        // networkError,
        isSubmittable: isSubmittable(),
        updateField,
        assignRole,
        submit
    };
};