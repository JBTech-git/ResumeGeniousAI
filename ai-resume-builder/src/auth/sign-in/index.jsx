import { SignIn } from '@clerk/clerk-react'
import React from 'react'

export default function SignInPae() {
  return (
    <div className='py-8 flex justify-center items-center'>
        <SignIn/>
    </div>
  )
}
