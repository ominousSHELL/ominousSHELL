"use client"
import { FaGear } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { toggleSidebar } from "../utilties/toggles/toggleSidebar";


export default function Header(){
    return (
        <div className='border-b border-white p-3 grid grid-cols-2 gap-0 place-content-center'>
            <h1 className='text-white text-3xl md:text-5xl font-bold flex items-center'>ominous-g<FaGear className="rotate-element text-white text-2xl md:text-3xl mt-2"/>n</h1>
            <button data-collapse-toggle='navbar-default' type='button' className='p-1 mt-4 mr-2 absolute inset-y-0 right-0 text-sm text-gray-500 focus:ring-gray-600' aria-controls="navbar-default" aria-expanded="false">
                <HiOutlineMenuAlt3 onClick={() => toggleSidebar('toggle')}className="block xl:hidden rounded-lg text-3xl font-bold absolute inset-y-0 right-0"/>
            </button>
        </div>
    )
}