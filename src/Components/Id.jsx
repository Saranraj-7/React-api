import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Id = () => {
    const [userIds, setUserIds] = useState([]);

    useEffect(() => {
        axios.get('https://gorest.co.in/public/v2/users', {
            headers: {
                Authorization: `Bearer 79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f`
            }
        })
            .then(res => {
                // Extracting IDs from the response data
                const ids = res.data.data.map(user => user.id);
                setUserIds(ids);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h2>User IDs:</h2>
            <ul>
                {userIds.map(id => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
        </div>
    )
}

export default Id;
