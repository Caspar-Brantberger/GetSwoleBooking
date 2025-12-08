import React from 'react';
import  Input  from './Input';
import   Card from './Card';
import  Button  from './Button';
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import { useNavigate } from 'react-router-dom';

const LoginCard: React.FC = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        try{
            const user = login(email, password);
            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            }
            else 
                navigate('/user-dashboard'); 
            } catch (err: any) {
            setError('Invalid email or password');
        }
    };

    return(
        <Card className="w-full max-w-md p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>

            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <Input label="Email" placeholder="example@.com" value = {email} onChange={e => setEmail(e.target.value)} />
                <Input label="Password" placeholder="*******" value = {password} onChange={e => setPassword(e.target.value)}/>
                <Button type="button" onClick={handleLogin}>Log In</Button>
            </form>
            <p className="text-sm text-center mt-4">
                Don't have an account?
                <Link to="/register" className="text-blue-500 hover:underline"> Register</Link>
            </p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </Card>
    );
};

export default LoginCard;
