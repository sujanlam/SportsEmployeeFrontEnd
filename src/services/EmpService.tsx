import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = async () => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error){
        console.error('Error Gettign employee details!!!');
        throw error;
    }
    
};