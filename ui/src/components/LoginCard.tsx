import React from 'react';
import  Input  from './Input';
import   Card from './Card';
import  Button  from './Button';

const LoginCard: React.FC = () => {
    return(
        <Card className="w-full max-w-md p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
            <form className="space-y-4">
                <Input label="Email" placeholder="example@.com" />
                <Input label="Password" placeholder="*******" />
                <Button type="button">Log In</Button>
            </form>
            <p className="text-sm text-center mt-4">
                Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
            </p>
        </Card>
    );
};

export default LoginCard;
