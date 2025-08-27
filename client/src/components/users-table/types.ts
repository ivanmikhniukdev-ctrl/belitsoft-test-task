export type ToastState = {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
};

export type UserTableRow = {
    id: string | number;
    name: string;
    email: string;
    roles: string[];
};

