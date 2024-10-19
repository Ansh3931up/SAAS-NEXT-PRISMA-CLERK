import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (<div className='flex justify-center items-center mx-auto'>
    <div className='p-10  bg-gray-800 w-full flex justify-center shadow-md'>
    <SignUp 
  appearance={{
    elements: {
      formButtonPrimary: 'bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded',
      formFieldInput: 'bg-gray-00 border border-gray-300 rounded py-2 px-4 placeholder:text-gray-600',
      formFieldLabel: 'text-gray-700 font-bold',
      footerActionLink: 'text-blue-600 hover:text-blue-800',
      card: ' bg-gray-200 shadow-md rounded',
      placeholder: 'text-gray-400',
    },
    }}/>
    </div>

    </div>)
}