// api.js
import axios from 'axios';

const API_TOKEN = '79a3b1d569005f3bb059d351efbfc433938986d1c759d0c23bee1a7f32e8d27f';

export const getUsers = async () => {
    try {
        const response = await axios.get('https://gorest.co.in/public/v2/users', {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await axios.post(
            "https://gorest.co.in/public/v2/users",
            userData,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const editUser = async (userId, userData) => {
    try {
        const response = await axios.put(`https://gorest.co.in/public/v2/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        return response.status === 200 || response.status === 204;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
