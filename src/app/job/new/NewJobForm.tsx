'use client'

import H1 from "@/components/ui/H1"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CreateJobValues, createJobSchema } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import Select from "@/components/ui/select"
import { jobType, locationType } from "@/lib/job-Type"
import LocationInput from '@/components/LocationInput'
import { X } from "lucide-react"

export default function NewJobForm() {
    const form = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema)
    })

    async function onSubmit(values: CreateJobValues) {
        alert(JSON.stringify(values, null, 2))

    }

    const { handleSubmit, watch, trigger, control, setValue, setFocus, formState: { isSubmitting } } = form;



    return (
        <main className="max-w-3xl m-auto my-10 space-y-10">
            <div className="space-y-5 text-center">
                <H1>Find Your Perfect Developer </H1>
                <p>Get your job posting seen by thousands of job seekers!</p>
            </div>
            <div className="space-y-6 border rounded-lg p-4">
                <div>
                    <h2 className="font-semibold">Jobs details</h2>
                    <p className="text-muted-foreground">provide a job description and details</p>
                </div>

                <Form {...form}>
                    <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>

                        <FormField control={control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g Frontend Developer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )} />

                        <FormField
                            control={control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Type</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <option value="" hidden>
                                                Select an option
                                            </option>
                                            {jobType.map((job) =>
                                                <option key={job} value={job}>
                                                    {job}
                                                </option>)}

                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}  >

                        </FormField>

                        <FormField control={control} name="companyName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )} />

                        <FormField control={control} name="companyLogoUrl" render={({ field: { value, ...fieldValue } }) => (
                            <FormItem>
                                <FormLabel>Company logo</FormLabel>
                                <FormControl>
                                    <Input {...fieldValue}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            fieldValue.onChange(file)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )} />


                        <FormField
                            control={control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Select {...field} defaultValue="">
                                            <option value="" hidden>
                                                Select an option
                                            </option>
                                            {locationType.map((location) =>
                                                <option key={location} value={location}>
                                                    {location}
                                                </option>)}

                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}  >

                        </FormField>


                        <FormField control={control} name="location" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Office Location</FormLabel>
                                <FormControl>
                                    <LocationInput onLocationSelected={field.onChange} ref={field.ref} />
                                </FormControl>
                                {watch('location') && (
                                    <div className="flex   items-center gap-1">
                                        <button onClick={() => {
                                            setValue("location", "", { shouldValidate: true })
                                        }} type="button">
                                            <X size={20} />

                                        </button>
                                        <span className="text-sm">{watch('location')}</span>
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>

                        )} />



                    </form>


                </Form>

            </div>
        </main>
    )
}