import React from 'react'
import { Label } from './label'
import { Input } from './input'
import Select from '@/components/ui/select'
import prisma from '@/lib/prisma'
import { jobType } from '@/lib/job-Type'
import { Button } from './button'
import { jobFilterSchema, jobFilterValue } from '@/lib/validation'
import { redirect } from 'next/navigation'
import FormSubmitButton from '@/components/FormSubmitButton'
interface JobFilterSidebarProps {
    defaultValue: jobFilterValue
}

async function filterjobs(formData: FormData) {
    'use server'
    const values = Object.fromEntries(formData.entries());
    const { jobName, type, location, remote } = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(jobName && { jobName: jobName.trim() }),
        ...(type && { type: type }),
        ...(location && { location: location }),
        ...(remote && { remote: 'true' })
    })

    redirect(`/?${searchParams.toString()}`)
}

export default async function JobSidebar({ defaultValue }: JobFilterSidebarProps) {

    const jobLocation = await prisma.job.findMany({
        where: { approved: true },
        select: { location: true },
        distinct: ['location']
    })

    let location = jobLocation.map((job) => {
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
                        <Input id='jobName' name='jobName' placeholder='Title , Company , etc' defaultValue={defaultValue.jobName} />
                    </div>
                    <div>
                        <Label htmlFor='type'>Types</Label>
                        <Select id='type' name='type' defaultValue={defaultValue.type}>
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
                        <Select id='location' name='location' defaultValue={defaultValue.location}>
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
                            className='scale-125 accent-black'
                            defaultChecked={defaultValue.remote} />
                        <Label htmlFor='remote'>Remote Job</Label>

                    </div>
                    <FormSubmitButton type='submit' className='w-full'> Filter Jobs</FormSubmitButton>
                </div>

            </form>
        </aside>
    )
}

