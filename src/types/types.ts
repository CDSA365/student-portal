export type LoginValues = {
    email: string;
    password: string;
};

export type AuthContextType = {
    isLoggedIn: () => boolean;
    login: (value: LoginValues) => void;
    logout: () => void;
};

export type ClassTableTypes = {
    key: number;
    id: number;
    title: string;
    trainer: string;
    videoLink: string | null;
    slug: string;
    status: string;
    mode: string;
};
