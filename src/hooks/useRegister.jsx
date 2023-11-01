import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const { dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };

        try {
            const response = await fetch('https://weblog-server-cbto.onrender.com/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const json = await response.json();
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
            } else {
                const json = await response.json();
                setError(json.error);
                console.log(json.error)
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { register, error, isLoading };
};


