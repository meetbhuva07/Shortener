import React, { useEffect, useState } from 'react'
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
import Error from './error'
import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Login = () => {
const [errors, setErrors] = useState([])
const [fromData, setFromData] = useState({
  email:"",
  password:""
})

const handleInputChange = (e) => {
  const {name,value} = e.target
  setFromData((prevState) => ({
    ...prevState,
    [name]: value,
  }))
}

const navigate = useNavigate()
let [searchParms] = useSearchParams()
const longLink = searchParms.get("createNew")

const {data,error,loading,fn:fnLogin} = useFetch(login,fromData)
useEffect(() => {
  console.log(data);
  
  if(error === null && data) {
    navigate(`/dashboard?${longLink ? `createNew=${longLink}`: ""}`)
  }
}, [data,error])


const handleLogin = async () => {
setErrors([])
try {
  const schema = Yup.object().shape({
    email:Yup.string().email("Invalid Email").required("Email is Required"),
    password:Yup.string().min(6,"password must be at least 6 characters").required("password is Required")
  })

  await schema.validate(fromData,{abortEarly:false})
    // api call
    await fnLogin()
} catch (e) {
  const newErrors = {}

  e?.inner?.forEach((err) => {
     newErrors[err.path] = err.message;    
  });

  setErrors(newErrors)
}
}
 
  return (
    <Card>
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription>to your account if you already have one </CardDescription>
    {error && <Error message={error.message}/>}
  </CardHeader>
  <CardContent className='space-y-2'>
    <div className="space-y-1">
        <Input name = 'email' type='email' placeholder = "Enter Email" onChange={handleInputChange}/>
        {errors.email && <Error message={errors.email} /> }
    </div>
    <div className="space-y-1">
        <Input name = 'password' type='password' placeholder = "Enter password"  onChange={handleInputChange} />
        {errors.password && <Error message={errors.password} /> }
    </div>
  </CardContent>
  <CardFooter>
    <Button  onClick={handleLogin}>
        {loading?<BeatLoader size={10} color='#111827'/>:"Login"}
    </Button>
  </CardFooter>
</Card>
  )
}

export default Login