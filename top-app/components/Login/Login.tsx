import styles from "./Login.module.css";
import {useForm} from "react-hook-form";
import {LoginForm} from "./LoginForm.interface";
import cn from "classnames";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import axios from "axios";
import Cookie, {CookieAttributes} from "js-cookie";
import {LoginProps} from "./Login.props";
import {useState} from "react";

export const Login = ({ className, ...props }: LoginProps ): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await axios.post('http://localhost:8080' + '/auth/sign-in', data);
            const { token } = response.data;
            console.log(token);

            const cookieOptions: CookieAttributes = {
                expires: 7,
                secure: true,
                sameSite: 'strict'
            };


            Cookie.set('token', token, cookieOptions);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    return (
        <div className={cn(styles.container, className)}
             {...props}
        >
            <h1>Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cn(styles.authForm, className)}
                     {...props}
                >
                    <Input
                        className={styles.field}
                        {...(register('username', {required: true}))}
                        placeholder='Имя'
                        error={errors.username}
                    />

                    <Input {...register('password')} className={styles.field} placeholder='Пароль'/>

                    <div className={styles.submit}>
                        <Button appereance='primary'>Отправить</Button>
                    </div>
                    <div className={cn(styles.hasAcc, className)}>
                        <span>Ещё нет аккаунт?</span>
                        <a className={cn(styles.loginLink, className)} href="/auth">Вход</a>
                    </div>
                </div>
            </form>
            {errorMessage && <div className={cn(styles.errorContainer, className)}>
                                <span className={cn(styles.errorMessage, className)}>{errorMessage}</span>
                             </div>}
        </div>
    );
};