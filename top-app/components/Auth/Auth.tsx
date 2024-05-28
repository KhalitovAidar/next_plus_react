import styles from "../Auth/Auth.module.css";
import {useForm} from "react-hook-form";
import {AuthForm} from "./AuthForm.interface";
import cn from "classnames";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import axios from "axios";
import Cookie, {CookieAttributes} from "js-cookie";
import {AuthProps} from "./Auth.props";
import {useState} from "react";

export const Auth = ({ className, ...props }: AuthProps ): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<AuthForm>();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = async (data: AuthForm) => {
        try {
            console.log(process.env.BACK_PUBLIC_DOMAIN + '/auth/sign-up');
            console.log(data);
            const response = await axios.post('http://localhost:8080' + '/auth/sign-up', data);
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
            // Обработка ошибок, если есть
        }
    };

    return (
        <div className={cn(styles.container, className)}
             {...props}
        >
            <h1>Регистрация</h1>
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
                    <Input {...register('email')} className={styles.field} placeholder='Email'/>

                    <Input {...register('password')} className={styles.field} placeholder='Пароль'/>

                    <div className={styles.submit}>
                        <Button appereance='primary'>Отправить</Button>
                    </div>
                    <div className={cn(styles.hasAcc, className)}>
                        <span>Уже есть аккаунт?</span>
                        <a className={cn(styles.loginLink, className)} href="/login">Вход</a>
                    </div>
                </div>
            </form>
            {errorMessage && <div className={cn(styles.errorContainer, className)}>
                                <span className={cn(styles.errorMessage, className)}>{errorMessage}</span>
                             </div>}
        </div>
    );
};