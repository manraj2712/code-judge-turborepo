
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react'

export function Footer() {
    const tabarr=[
        {
            name:'Privacy Policy',
            href:'/privacy-policy'
        },
        {
            name: 'Terms',
            href: '/terms'
        },
        {
            name: 'About',
            href: '/about'
        },
        {
            name: 'Contact',
            href: '/contact'
        }
    ]
    const year = dayjs().year();
    return (
        <footer className="flex w-full flex-row flex-wrap items-center justify-center  border-t border-blue-gray-50 py-4 text-center md:justify-between ">
            <div className='flex flex-row gap-x-2'>
                <h3 color="blue-gray" className="font-normal ml-4">
                    &copy; {year}
                </h3>
                <h3 className="font-normal bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    <span className="text-white">Code</span>
                    Streax
                </h3>
            </div>
            <div className='flex flex-row mx-4 flex-wrap gap-x-2 justify-center items-center'>
                {tabarr.map((item,index)=>(
                    <div className='flex flex-row flex-wrap gap-x-2'>
                        <Link href={item.href} key={index}>
                            {item.name}
                    </Link>
                    <p>{index !== tabarr.length - 1?"|":""}</p>
                    </div>
                )
                )
                 }
            </div>
        </footer>
    );
}

export default Footer