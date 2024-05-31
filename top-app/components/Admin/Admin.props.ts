import {DetailedHTMLProps, HTMLAttributes} from "react";
import {User} from "../../interfaces/admin.interface";

export interface AdminProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    users: User[]
}