import { z } from "zod";
import { jobType, locationType } from "./job-Type";


const requiredString =  z.string().min(1 ,'Required');

const companyLogoFile = z.custom<File|undefined>().refine(file=>(
    !file || (file instanceof File && file.type.startsWith('image/'))
),"Must be an image file").refine(file=>(
     !file || file.size <1024*1024*2
 ) , 'File must be less than 2MB')

const numberRequiredString = requiredString.regex(/^\d+$/ , 'Must be a Number')


const applicationSchema = z.object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),

}).refine(data=>data.applicationEmail || data.applicationUrl ,{
    message:"email or url is required",
    path:['applicationEmail']
})

const locationSchema = z.object({
    locationType :requiredString.refine(
        value=>locationType.includes(value),
        "Invalid location Type"
    ),
    location:z.string().max(100).optional()
}).refine(
    data=> !data.locationType || data.locationType ==="Remote" || data.location,{
        message:'Location is required for onsite job',
        path:['location']
    }
)


export const createJobSchema = z.object({
     title:requiredString.max(100),
     type:requiredString.refine(
        value=>jobType.includes(value),
        "Invalid Job type"
     ),
     companyName:requiredString.max(100),
     companyLogoUrl:companyLogoFile,
     description:z.string().max(5000).optional(),
     salary:numberRequiredString.max(9 ,"Number can't be longer than 9 Digit"), 

}).and(applicationSchema).and(locationSchema)




export const jobFilterSchema = z.object({
    jobName : z.string().optional(),
    type : z.string().optional(),
    location : z.string().optional(),
    remote: z.coerce.boolean().optional()

})

export type jobFilterValue = z.infer<typeof jobFilterSchema> 


export type CreateJobValues = z.infer< typeof createJobSchema>