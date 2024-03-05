import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Userdetails = ({ users }) => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    console.log(users, "hi");

    useEffect(() => {
        if (userId) {
            axios.get(`https://gorest.co.in/public/v2/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
                    },
                })
                .then(response => {
                    setUserDetails(response.data)
                })
                .catch(error => console.error('Error fetching user details:', error));
        }
    }, [userId]);

    if (!userDetails) {
        return <div></div>;
    }

    return (
        <div className="container mt-5">
            <h2>User Details</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userDetails.id}</td>
                            <td>{userDetails.name}</td>
                            <td>{userDetails.email}</td>
                            <td>{userDetails.gender}</td>
                            <td>{userDetails.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Userdetails; 
