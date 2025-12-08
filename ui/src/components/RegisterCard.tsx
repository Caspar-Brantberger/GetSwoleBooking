import React from 'react';
import  Card  from './Card';
import  Input  from './Input';
import  Button  from './Button';
import { Link } from "react-router-dom";
import { register } from "../services/authService";
import { useNavigate } from 'react-router-dom';

const RegisterCard: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [role, setRole] = React.useState<"user" | "admin">('user');
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const validate = (): String | null => {
        if (!email || !password || !confirmPassword) {
            return 'All fields are required';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return null;
    };

    const handleRegister = () => {
    const validationError = validate();
    if (validationError) {
        setError(validationError as string);
    return;
    }

    setError(null);
    setLoading(true);

    try {
        register(email.trim(), password, role);
        navigate('/login'); 
    } catch (err: any) {
        setError(err.message || 'Registration failed');
    } finally {
        setLoading(false);
    }
    };


    return(
<Card className="w-full max-w-md p-6">
    <h1 className = "text-2xl font-bold text-center mb-4 ">Register</h1>

    <form className ="space-y-4"
        onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
        }}>
    <Input label="Email" placeholder="example@.com" value= {email} onChange={(e) => setEmail(e.target.value)} />
    <Input label="Password" placeholder="*******" value= {password} onChange={(e) => setPassword(e.target.value)}/>
    <Input label="Confirm Password" placeholder="*******"value= {password} onChange={(e) => setConfirmPassword(e.target.value)} />
    <Button type= "submit"> {loading ? "Registering..." : "Register"} </Button>

    <div>
        <label className="block text-sm font-medium mb-1">Roll</label>
        <select className="w-full border rounded px-3 py-2" value={role}
            onChange={(e) => setRole(e.target.value as "user" | "admin")}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
    </div>
    {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>

    <p className= "text-sm text-center mt-4">
        Do you have an account?
        <Link to ="/login" className="text-blue-500 hover:underline"> Log in </Link>
    </p>
    </Card>
    );
};

export default RegisterCard;