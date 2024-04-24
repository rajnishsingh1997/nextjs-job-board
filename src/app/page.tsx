import H1 from "@/components/ui/H1";
import JobList from "@/components/ui/JobList";
import JobSidebar from "@/components/ui/JobSidebar";
import prisma from "@/lib/prisma";

export default async function Home() {
  const data = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-5xl m-auto px-5 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1 >Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream jobs</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobSidebar />
        <div className="space-y-4 grow">

          {
            data.map((job) => {
              return <JobList job={job} key={job.id} />
            })
          }
        </div>
      </section>
    </main>
  );
}
