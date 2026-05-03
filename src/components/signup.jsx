import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const navigate = useNavigate();
  let [searchParms] = useSearchParams();
  const longLink = searchParms.get("createNew");

  const [errors, setErrors] = useState([]);

  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFromData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, fromData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, data]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        email: Yup.string().email("Invalid Email").required("Email is Required"),
        password: Yup.string()
          .min(6, "password must be at least 6 characters")
          .required("password is Required"),
        profile_pic: Yup.mixed().required("Profile Picture is Required"),
      });

      await schema.validate(fromData, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-gray-950 to-gray-900">

      <Card className="w-full max-w-md sm:max-w-lg bg-gray-900/60 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl">

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Signup
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-400">
            Create a new account if you haven’t already
          </CardDescription>

          {error && <Error message={error.message} />}
        </CardHeader>

        <CardContent className="space-y-4 px-4 sm:px-6">

          {/* NAME */}
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleInputChange}
              className="h-11 sm:h-12"
            />
            {errors.name && <Error message={errors.name} />}
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
              className="h-11 sm:h-12"
            />
            {errors.email && <Error message={errors.email} />}
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
              className="h-11 sm:h-12"
            />
            {errors.password && <Error message={errors.password} />}
          </div>

          {/* PROFILE PIC */}
          <div className="space-y-1">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="cursor-pointer"
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>

        </CardContent>

        <CardFooter className="px-4 sm:px-6 pb-6">

          <Button
            onClick={handleSignup}
            disabled={loading}
            className="w-full h-11 sm:h-12 text-base font-semibold"
          >
            {loading ? (
              <BeatLoader size={10} color="#111827" />
            ) : (
              "Create Account"
            )}
          </Button>

        </CardFooter>

      </Card>

    </div>
  );
};

export default Signup;