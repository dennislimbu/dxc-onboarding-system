import React, { useEffect, useState } from "react";
import { getUsers } from "./api/UserApi";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>DXC Onboarding System</h1>
            <h2>Users</h2>

            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                users.map((user) => (
                    <div key={user.id}>
                        <p>{user.fullName} - {user.role}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default App;