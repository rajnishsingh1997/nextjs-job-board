import JobList from "./ui/JobList"
import prisma from "@/lib/prisma";

export default async function JobResult() {
    const data = await prisma.job.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' }
    })
    console.log(data)
    return (
        <div className="space-y-4 grow">

            {
                data.map((job) => {
                    return <JobList job={job} key={job.id} />
                })
            }
        </div>
    )
}