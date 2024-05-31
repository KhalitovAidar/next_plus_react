import {Admin} from "../components/Admin/Admin";
import {GetServerSidePropsContext} from "next";
import {parseCookies} from "nookies";
import axios, {AxiosError} from "axios";
import {User} from "../interfaces/admin.interface";
import {AdminProps} from "../components/Admin/Admin.props";

function AdminPage({ users }: AdminProps) {

    return (<>
            <Admin users={users} />
            </>
    );
}

export default AdminPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    try {
        const { data: users } = await axios.post<User[]>('http://localhost:8080/auth/admin', null,  {
            headers: { Authorization: `Bearer ${token}` }
        });

        return {
            props: {
                users
            },
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 403) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                };
            }
        }

        // Обработка других ошибок
        console.error('Ошибка при получении данных:', error);
        return {
            notFound: true,
        };
    }
};