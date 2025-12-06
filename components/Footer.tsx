import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {

    const TheNewStackLogo = "https://roadmap.sh/img/tns-sm.png";

    return (
        <footer className='bg-[#0f172a] text-gray-300 py-20 flex items-center justify-center'>
            <div className='container mx-auto max-w-4xl flex flex-col'>
            
                <div className='flex gap-x-8 mx-auto mb-8 font-semibold'>
                    <div><Link href={"/"}>Edsential Lab</Link></div>
                    <div><Link href={"/"}>Guides</Link></div>
                    <div><Link href={"/"}>FAQs</Link></div>
                    <div><Link href={"/"}>Youtube</Link></div>
                </div>
 
                <div className='flex flex-row justify-between my-10'>

                    {/* Column 1 */}
                    <div>
                        <div className='text-white'><span className='font-bold'>Edsential Lab</span> <span className='mx-2'> by </span><span className='bg-blue-600 text-white p-1.5 rounded-xl'>@Edsential Team</span></div>
                        <div className='font-light my-5'>Edsential Lab created for best practices, projects, <br/> artcles, resources and journeys to help you choose your <br /> path and grow in your career</div>
                        <div className='font-light'>Edsential Lab • Terms • Privacy</div>
                    </div>

                    {/* Column 2 */}
                    <div className='text-right'>
                        <div className='flex justify-end'><Image src={TheNewStackLogo} alt="" width={200} height={200} /></div>
                        <div className='my-5'>The top DevOps resource for Kubernetes, <br /> cloud-native computing, and large-scale <br /> development and deployment.</div>
                        <div className=''>DevOps • Kubernetes • Cloud-Native</div>
                    </div>

                </div>
            </div>
        </footer>
    )
}
