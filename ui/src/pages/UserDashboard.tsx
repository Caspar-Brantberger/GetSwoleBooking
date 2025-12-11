import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

//Type of access
type AccessOption = {
    id: string;
    type: 'Free Day' | 'Free Week' | 'Single Pass';
    price?: number;
};

// Type of gym
type Gym = {
    id: string;
    name: string;
    accessOptions: AccessOption[];
};

const UserDashboard: React.FC = () => {
    const navigate = useNavigate();

  // fetches gyms from admin dashboard
    const [gyms, setGyms] = React.useState<Gym[]>(() => {
    const saved = localStorage.getItem('mockGyms');
    return saved ? JSON.parse(saved) : [];
    });

    const [bookedOptions, setBookedOptions] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('userBookings');
    return saved ? JSON.parse(saved) : [];
    });

    const bookOption = (gymId: string, optionId: string) => {
    const key = `${gymId}-${optionId}`;
    if (!bookedOptions.includes(key)) {
        const updated = [...bookedOptions, key];
        setBookedOptions(updated);
        localStorage.setItem('userBookings', JSON.stringify(updated));
    }
    };

    const cancelOption = (gymId: string, optionId: string) => {
    const key = `${gymId}-${optionId}`;
    const updated = bookedOptions.filter(k => k !== key);
    setBookedOptions(updated);
    localStorage.setItem('userBookings', JSON.stringify(updated));
    };

    return (
    <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to GetSwoleBooking!</h1>
        <h2 className="text-3xl font-bold mb-6 text-center">This are the available passes right now:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map(gym => (
            <Card key={gym.id} className="p-4">
            <h2 className="text-xl font-semibold mb-2">{gym.name}</h2>

            {gym.accessOptions.length === 0 && <p>No passes available.</p>}

            {gym.accessOptions.map(opt => {
                const booked = bookedOptions.includes(`${gym.id}-${opt.id}`);
                return (
                <div key={opt.id} className="mb-2 border p-2 rounded flex justify-between items-center">
                    <span>
                    {opt.type} {opt.price ? `- $${opt.price}` : ''}
                    </span>
                    <Button
                    onClick={() => (booked ? cancelOption(gym.id, opt.id) : bookOption(gym.id, opt.id))}
                    >
                    {booked ? 'Cancel' : 'Book'}
                    </Button>
                </div>
                );
            })}
            </Card>
        ))}
        </div>

        <div className="mt-6">
        <Button onClick={() => navigate('/login')}>Log out</Button>
        </div>
    </div>
    );
};

export default UserDashboard;