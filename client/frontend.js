import axios from "axios";

const verifyBusiness = async () => {
    const token = localStorage.getItem("token"); 

    try {
        const response = await axios.post(
            "http://localhost:8000/api/verify-business",
            {
                "name":"arora book depot",
                "desc":"a bookstore",
                "address": "main chauraha",
                "city":"khatima",
                "phone":"XXXXXXXXXX",
                "state":"uttarakhand",
                "zip_code":"262308"
            },
            { headers: { Authorization: token } }
        );

        console.log("Business Verified:", response.data);
    } catch (error) {
        console.error("Error verifying business:", error.response.data); 
    }
};
