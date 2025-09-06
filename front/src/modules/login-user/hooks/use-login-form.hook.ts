import { useAppDispatch, type AppState } from "@eventhub/store/store"
import { useRef, useState } from "react";
import type { AuthModel } from "../domain/model/auth-model";
import { useSelector } from "react-redux";
import { LoginUserForm } from "../domain/forms/login-user-form";
import { loginUserAction } from "../actions/login.user.action";
import { useNavigate } from "react-router-dom";

type ValidationError = Partial<Record<keyof AuthModel.LoginForm, string>>;

export const useLoginForm = () => {

    function updateField<K extends keyof AuthModel.LoginForm>(
        key: K,
        value: AuthModel.LoginForm[K]
    ) {
        const newForm = loginForm.current.updateField(form, key, value);
        setForm(newForm);

        const validation = loginForm.current.validate(newForm);
        setErrors(validation.errors);
    }

    function isSubmittable() {
        return loginForm.current.isSubmittable(form);
    }

    async function submit() {
        const ok = await dispatch(loginUserAction(form));
        if(ok) {
            navigate('/create-event')
        }
    }


    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const loginForm = useRef(new LoginUserForm());
    const [form, setForm] = useState<AuthModel.LoginForm>({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState<ValidationError>({})
    // const networkError = useSelector((state: AppState) => state.auth.error) : Opter pour le flashMessage

    return {
        form,
        errors,
        // networkError,
        isSubmittable: isSubmittable(),
        updateField,
        submit
    }
}