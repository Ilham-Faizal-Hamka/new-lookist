import React from 'react'
import NavBar from "../../components/navbar/NavBar";
import Lookist from "../../assets/lookist.png"
import mern from "../../assets/Backend.png"
import styling from "../../assets/FrontEnd.png"

export default function About() {
    return (
        <>
            <NavBar />
            <div>
                <img src={Lookist} className="mt-2 ml-8" alt='lookist logo'></img>
            </div>
            <div className='flex mx-8 mt-5'>
                <div className='p-4 bg-abu-abu rounded-lg border-white text-justify text-2xl border w-3/4 h-64'>
                    Lookist adalah aplikasi web blog maker yang menggunakan MERN stack. Aplikasi ini menyediakan layanan bagi pengguna untuk membaca, menulis, dan juga membuat kreasi dengan blog dan cerita  yang ingin dibagikan kepada dunia.
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-3xl font-bold underline'>
                        Tech Stack
                    </p>
                    <img src={mern} alt="mern logos" className='scale-75 -translate-y-16' />
                    <img src={styling} alt="styling framework" className='scale-75 -translate-y-36' />
                </div>
            </div>

        </>
    )
}
