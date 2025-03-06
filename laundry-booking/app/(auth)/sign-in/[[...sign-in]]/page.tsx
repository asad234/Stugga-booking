import { SignIn } from '@clerk/nextjs'; // Import the SignIn component from Clerk

export default function Page() {
  return(
    <div className='flex justify-center items-center h-screen'>
      <SignIn />;
    </div>
  ) 
}

