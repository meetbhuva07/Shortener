import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Auth = () => {

  const [searchParams] = useSearchParams();

  return (
    <div className='m-36 flex flex-col items-center gap-10'>
      <h1 className='text-5xl font-extrabold'>
        {searchParams.get("createNew")
        ? "hold up! Let's login first....."
        : "Login / Signup"}
        </h1>
    </div>
  );
};

export default Auth
