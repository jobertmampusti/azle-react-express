import { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [userId, setUserId] = useState('');
    const [userOutput, setUserOutput] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = {
            username,
            age: Number(age),  // Convert age to number
        };

        try {
            const response = await fetch('http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            const result = await response.json();
            console.log('User created:', result);

            // Reset form
            setUsername('');
            setAge('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleGet = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            
            const result = await response.json();

            if (result != null) {
                setUserOutput(result);
                setError('');
            }
            else {
                setUserOutput(null);
                setError('User not found');
            }
        } catch (error) {
            setError('User not found');
            setUserOutput(null);
        }
    }

return (
    <div className="bg-blue-400 w-56 flex mx-auto flex-col items-center">
        <p>User Create</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
                className="w-36 mt-2"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                className="w-36 mt-2"
                type="number"
                placeholder="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />
            <button className="mt-2 mb-5 bg-gray-400" type="submit">
                    Submit
            </button>
        </form>
        <p>Get User By ID</p>
        <form className="flex flex-col" onSubmit={handleGet}>
            <input
                className="w-36 mt-2"
                type="number"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button className="mt-2 mb-5 bg-gray-400" type="submit">
                    Submit
            </button>
            {userOutput && (
                <div className="mt-4 p-2 bg-white w-full text-left">
                    <p><strong>ID:</strong> {userOutput.id}</p>
                    <p><strong>Username:</strong> {userOutput.username}</p>
                    <p><strong>Age:</strong> {userOutput.age}</p>
                </div>
            )}
            {error && (
                <div className="mt-4 p-2 bg-red-400 w-full text-left text-white">
                    <p>{error}</p>
                </div>
            )}
        </form>
        
    </div>
    
);
}
 
export default Register;