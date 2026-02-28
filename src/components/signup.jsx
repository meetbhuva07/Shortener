import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch'
import { signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'

const SignUp = () => {

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: null
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(
            (prevData) => ({
                ...prevData,
                [name]: files ? files[0] : value
            })
        )
    }
    const { loading, error, fn: fnSignUp, data } = useFetch(signup, formData);

    const { fetchUser } = UrlState();
    const handleSignUp = async () => {
        setErrors([]);
        // Handle login logic here
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                profile_pic: Yup.mixed().required('Profile picture is required'),
            });
            await schema.validate(formData, { abortEarly: false });
            await fnSignUp();
            // If validation passes, proceed with login with api call
        } catch (error) {
            const newErrors = {};

            error?.errors?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }

    useEffect(() => {
        // console.log(data);
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
            fetchUser();
        }
    }, [error, loading]);
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up to your account
                    </CardTitle>
                    <CardDescription>Enter your details below to create your account
                    </CardDescription>
                    <CardAction>Login</CardAction>
                    {error && <Error message={error.message} />}
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Input type="text" name="name" placeholder="Enter Name" onChange={handleInputChange} />
                        {errors.name && <Error message={errors.name} />}
                    </div>
                    <div className="space-y-1">
                        <Input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                        {errors.email && <Error message={errors.email} />}
                    </div>
                    <div className="space-y-1">
                        <Input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                        {errors.password && <Error message={errors.password} />}
                    </div>
                    <div className="space-y-1">
                        <Input type="file" name="profile_pic" placeholder="Profile Picture" accept="image/*" onChange={handleInputChange} />
                        {errors.profile_pic && <Error message={errors.profile_pic} />}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleSignUp}>
                        {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignUp