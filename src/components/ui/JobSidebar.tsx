import React from 'react'
import { Label } from './label'
import { Input } from './input'
import Select from '@/components/ui/select'
import prisma from '@/lib/prisma'
import { jobType } from '@/lib/job-Type'
import { Button } from './button'
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
                    <div>
                        <Label htmlFor='type'></Label>
                        <Select id='type' name='type' defaultValue=''>
                            <option value="">All Types</option>
                            {
                                jobType.map((type) => {
                                    return <option key={type} value={type || ""}>{type}</option>
                                })
                            }
                        </Select>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='location'>
                            location
                        </Label>
                        <Select id='location' name='location' defaultValue="">
                            <option value="">All location</option>
                            {
                                location.map((location) => {
                                    return <option key={location} value={location || ""}>{location}</option>
                                })
                            }
                        </Select>

                    </div>
                    <div className='flex items-center gap-2'>
                        <input
                            id='remote'
                            name='remote'
                            type='checkbox'
                            className='scale-125 accent-black' />
                        <Label htmlFor='remote'>Remote Job</Label>

                    </div>
                    <Button type='submit' className='w-full'> Filter Jobs</Button>
                </div>

            </form>
        </aside>
    )
}

