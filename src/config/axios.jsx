import axios from "axios";

const axiosClient=axios.create({
    baseURL:`https://cuentasporcobrarapi.azurewebsites.net/api`
})



export { axiosClient};