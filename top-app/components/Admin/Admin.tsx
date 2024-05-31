import styles from "./Admin.module.css";
import cn from "classnames";
import axios from "axios";
import {AdminProps} from "./Admin.props";
import {useState} from "react";
import {useRouter} from "next/router";
import {parseCookies} from "nookies";

export const Admin = ({ users, className, ...props }: AdminProps ): JSX.Element => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const getCookie = (name: string) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    };

    const onSubmit = async (data: string) => {
        const token = getCookie('token');

        if (!token) {
            return {
                redirect: {
                    destination: '/auth',
                    permanent: false,
                },
            };
        }
        const resultData = {
            username: data
        };
        try {
            console.log(resultData);
            const response = await axios.post('http://localhost:8080' + '/delete-user', resultData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // router.push('/');
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            setErrorMessage('Ошибка при удалении');
        }
    };

    return (
        <div className={cn(styles.container, className)}
             {...props}
        >
            <h1>Админ страница</h1>

            {users.users.map((user, index) => (

                    <div key={index} className={cn(styles.usersContainer, className)}>
                        <span className={cn(styles.field, className)}>Имя: {user.username}</span>
                        <span className={cn(styles.field, className)}>Почта: {user.email}</span>
                        <span className={cn(styles.field, className)}>Роль: {user.role}</span>
                        <button onClick={() => onSubmit(user.username)}>Удалить</button>
                    </div>

            ))}

            {errorMessage && <div className={cn(styles.errorContainer, className)}>
                <span className={cn(styles.errorMessage, className)}>{errorMessage}</span>
            </div>}
        </div>
    );
};