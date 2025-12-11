import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

// Mock data
type Gym = {
    id: string;
    name: string; 
    booked: boolean;
};

const mockGyms: Gym[] = [
    { id: '1', name: 'Strongman', booked: false },
    { id: '2', name: 'Bodybuilding', booked: false },
    { id: '3', name: 'Powerlifting', booked: false },
];

const UserDashboard: React.FC = () => {
    const navigate = useNavigate();

    const [gyms, setGyms] = React.useState<Gym[]>(() => {
    const saved = localStorage.getItem('mockGyms');
    return saved ? JSON.parse(saved) : mockGyms;
    });

    const bookGym = (id: string) => {
    setGyms(prev => {
    const updated = prev.map(g => g.id === id ? { ...g, booked: true } : g);
    localStorage.setItem('mockGyms', JSON.stringify(updated));
    return updated;
    });
    };

    const cancelGym = (id: string) => {
    setGyms(prev => {
    const updated = prev.map(g => g.id === id ? { ...g, booked: false } : g);
    localStorage.setItem('mockGyms', JSON.stringify(updated));
    return updated;
    });
    };

    return (
    <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map(g => (
            <Card key={g.id} className="p-4">
            <h2 className="text-xl font-semibold mb-2">{g.name}</h2>
            <p className="mt-2 text-sm">
                {g.booked ? 'You have access' : "You don't have access yet."}
            </p>
            <div className="mt-4 flex gap-2">
                {!g.booked && <Button onClick={() => bookGym(g.id)}>Purchase</Button>}
                {g.booked && <Button onClick={() => cancelGym(g.id)}>Cancel</Button>}
            </div>
            </Card>
        ))}
        </div>

        <div className="mt-6">
        <Button
    onClick={() => {
    localStorage.removeItem('mockGyms'); 
    navigate('/login');                  
    }}
    >
    Log out
    </Button>
        </div>
    </div>
        );
    };

export default UserDashboard;