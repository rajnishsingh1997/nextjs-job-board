
import JobListItem from "@/components/ui/JobList";
import H1 from "@/components/ui/H1";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

export default async function AdminPage() {

    const user = await currentUser();

    console.log(user)

    const unapprovedJobs = await prisma.job.findMany({
        where: { approved: false },
    });

    return (
        <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
            <H1 className="text-center">Admin Dashboard</H1>
            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-bold">Unapproved jobs:</h2>
                {unapprovedJobs.map((job) => (
                    <Link key={job.id} href={`/admin/jobs/${job.slug}`} className="block">
                        <JobListItem job={job} />
                    </Link>
                ))}
                {unapprovedJobs.length === 0 && (
                    <p className="text-muted-foreground">No unapproved jobs</p>
                )}
            </section>
        </main>
    );
}
