import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
               Here You Can Find More Resources...
            </h2>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.wikipedia.org/" target='_blank' rel='noopener noreferrer'>
                    Resources
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img className='w-full object-contain h-fit' src="https://img.freepik.com/free-photo/nutshell-boats-explore-writing-near-travel-stuff_23-2147793489.jpg" />
        </div>
    </div>
  )
}