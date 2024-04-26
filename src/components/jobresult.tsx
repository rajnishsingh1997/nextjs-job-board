import { jobFilterValue } from "@/lib/validation";
import JobList from "./ui/JobList";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface JobsResultProps {
    filterValues: jobFilterValue;
}

async function JobResult({ filterValues: { jobName, type, location, remote } }: JobsResultProps) {

    const searchString = jobName?.split(" ").filter(word => word.length > 0).join(' & ');

    const searchFilter: Prisma.JobWhereInput = searchString ?

        {
            OR: [
                { title: { search: searchString } },
                { companyName: { search: searchString } },
                { type: { search: searchString } },
                { locationType: { search: searchString } },
                { location: { search: searchString } },
            ]
        }
        : {};


    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            type ? { type } : {},
            location ? { location } : {},
            remote ? { locationType: "Remote" } : {},
            { approved: true }

        ]
    }

    const data = await prisma.job.findMany({
        where: where,
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-4 grow">
            {data.map((job) => (
                <Link key={job.id} href={`/job/${job.slug}`} className="block">
                    <JobList job={job} key={job.id} />
                </Link>
            ))}
            {
                data?.length === 0 && <div className="mx-auto text-center">
                    <p>No jobs Found. Try adjusting your Filter</p>
                </div>
            }
        </div>
    );
}


export default JobResult;