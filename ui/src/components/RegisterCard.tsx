import React from 'react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

const RegisterCard: React.FC = () => {
    return(
<Card className="w-full max-w-md p-6">
    <h1 className = "text-2xl font-bold text-center mb-4 ">Register</h1>

    <form className ="space-y-4">
    <Input label="Email" placeholder="example@.com" />
    <Input label="Password" placeholder="*******" />
    <Input label="Confirm Password" placeholder="*******" />
    <Button type= "button">Register</Button>

    <div>
        <label className="block text-sm font-medium mb-1">Roll</label>
        <select className="w-full border rounded px-3 py-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
    </div>
    <Button type="button"> Register</Button>
    </form>

    <p className= "text-sm text-center mt-4">
        Do you have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
    </p>
    </Card>
    );
};

export default RegisterCard;