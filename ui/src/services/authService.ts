type User = {
    id: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
};

const STORAGE_KEY = "mock_users";

function LoadUsers(): User[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

const defaultUsers: User[] = [
    { id: "1", email: "user@mail.com", password: "userpass", role: "user" },
    { id: "2", email: "admin@mail.com", password: "adminpass", role: "admin" },
];


let users: User[] = [...defaultUsers, ...LoadUsers()];

export const login = (email: string, password: string): User => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    return user;
};

export const register = (email: string, password: string, role: 'user' | 'admin'): User => {
        if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const newUser: User = {
        id: String(Date.now()),
        email,
        password,
        role,
    };
    const savedUsers = [...LoadUsers(), newUser];
    saveUsers(savedUsers);

    users = [...defaultUsers, ...savedUsers];
    
    return newUser;
}

