import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

// Types
type AccessOption = {
    id: string;
    type: 'Free Day' | 'Free Week' | 'Single Pass';
    price?: number;
};

type Gym = {
    id: string;
    name: string;
    accessOptions: AccessOption[];
};

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    const [gyms, setGyms] = useState<Gym[]>(() => {
    const saved = localStorage.getItem('mockGyms');
    return saved ? JSON.parse(saved) : [];
    });

    const [newGymName, setNewGymName] = useState('');

  // Add a new gym
    const addGym = () => {
    if (!newGymName.trim()) return;
    const newGym: Gym = {
        id: String(Date.now()),
        name: newGymName.trim(),
        accessOptions: [],
    };
    const updated = [...gyms, newGym];
    setGyms(updated);
    localStorage.setItem('mockGyms', JSON.stringify(updated));
    setNewGymName('');
    };

  // Delete a gym
    const deleteGym = (gymId: string) => {
    const updated = gyms.filter(g => g.id !== gymId);
    setGyms(updated);
    localStorage.setItem('mockGyms', JSON.stringify(updated));
    };

  // Add a new access option
    const addAccessOption = (gymId: string, type: AccessOption['type'], price?: number) => {
    const updated = gyms.map(g => {
        if (g.id === gymId) {
        const newOption: AccessOption = {
            id: String(Date.now()),
            type,
            price,
        };
        return { ...g, accessOptions: [...g.accessOptions, newOption] };
        }
        return g;
    });
    setGyms(updated);
    localStorage.setItem('mockGyms', JSON.stringify(updated));
    };

  // Delete an access option
    const deleteAccessOption = (gymId: string, optionId: string) => {
    const updated = gyms.map(g => {
        if (g.id === gymId) {
        return {
            ...g,
            accessOptions: g.accessOptions.filter(o => o.id !== optionId),
        };
        }
        return g;
    });
    setGyms(updated);
    localStorage.setItem('mockGyms', JSON.stringify(updated));
    };

    return (
    <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Add a new gym */}
        <div className="mb-6 flex gap-2">
        <Input
            label="Gym name"
            placeholder="New gym name"
            value={newGymName}
            onChange={e => setNewGymName(e.target.value)}
        />
        <Button onClick={addGym}>Add Gym</Button>
        </div>

      {/* List of gyms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map(gym => (
            <Card key={gym.id} className="p-4">
            <h2 className="text-xl font-semibold mb-2">{gym.name}</h2>

            {/* Access options */}
            <div className="mb-2">
                {gym.accessOptions.map(opt => (
                <div key={opt.id} className="flex justify-between items-center border rounded p-2 mb-1">
                    <span>
                    {opt.type} {opt.price ? `- $${opt.price}` : ''}
                    </span>
                    <Button onClick={() => deleteAccessOption(gym.id, opt.id)}>Delete</Button>
                </div>
                ))}
            </div>

            {/* Add new access option */}
            <div className="flex gap-2 mt-2">
                <select id={`select-${gym.id}`} className="border rounded p-1">
                <option value="Free Day">Free Day</option>
                <option value="Free Week">Free Week</option>
                <option value="Single Pass">Single Pass</option>
                </select>
                <Input
                type="number"
                placeholder="Price (if Single Pass)"
                className="w-24"
                id={`price-${gym.id}`}
                />
                <Button
                onClick={() => {
                    const select = document.getElementById(`select-${gym.id}`) as HTMLSelectElement;
                    const priceInput = document.getElementById(`price-${gym.id}`) as HTMLInputElement;
                    const priceValue = priceInput.value ? Number(priceInput.value) : undefined;
                    addAccessOption(gym.id, select.value as AccessOption['type'], priceValue);
                    priceInput.value = '';
                }}
                >
                Add Option
                </Button>
            </div>

            <div className="mt-2 flex gap-2">
                <Button onClick={() => deleteGym(gym.id)}>Delete Gym</Button>
            </div>
            </Card>
        ))}
        </div>

      {/* Log out */}
        <div className="mt-6">
        <Button onClick={() => navigate('/login')}>Log out</Button>
        </div>
    </div>
    );
};

export default AdminDashboard;