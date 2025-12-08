type User = {
    email: string;
    password: string;
    role: 'user' | 'admin';
};

export const login = (email: string, password: string): User => {
    const users: User[] = [
        { email: 'user@mail.com', password: 'userpass', role: 'user' },
        { email: 'admin@mail.com', password: 'adminpass', role: 'admin' },
    ];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    return user;
};

