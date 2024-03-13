import instance from "../Interceptor/Interceptor";

export const token = "7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7";
export 

const Api ={
    getCustomersData:(id)=>{
        const url = id ? `/users/${id}` :"/users";
        return instance.get(url)
    },
    addCustomer:(customerData)=>{
        return instance.post("/users",customerData);
    },
    editCustomer:(id,customerData)=>{
        return instance.put(`/users/${id}`,customerData);
    },
    deleteCustomer:(id)=>{
        return instance.delete(`/users/${id}`);
    }
}


export default Api;