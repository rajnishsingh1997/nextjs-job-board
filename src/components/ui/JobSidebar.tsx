import React from 'react'
import { Label } from './label'
import { Input } from './input'
import Select from '@/components/ui/select'
import prisma from '@/lib/prisma'

export default async function JobSidebar() {

    async function filterjobs(formData: FormData) {

        'use server'

    }

    const JobLocation = await prisma.job.findMany({
        where: { approved: true },
        select: { location: true },
        distinct: ['location']
    })

    let location = JobLocation.map((job) => {
        const { location } = job;
        return location
    })

    location = location.filter(Boolean) as string[];



    return (
        <aside className='md:w-[260px] p-4 sticky top-0 h-fit bg-background rounded-lg'>
            <form action={filterjobs} >
                <div className='space-y-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='jobName'>
                            Search
                        </Label>
                        <Input id='jobName' name='jobName' placeholder='Title , Company , etc' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='location'>
                            location
                        </Label>
                        <Select id='location' name='location' value="">
                            <option value="">All location</option>
                            {
                                location.map((location) => {
                                    return <option key={location} value={location || ""}>{location}</option>
                                })
                            }
                        </Select>

                    </div>
                </div>

            </form>
        </aside>
    )
}

