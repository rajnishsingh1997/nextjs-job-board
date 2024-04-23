import JobList from "@/components/ui/JobList";
import prisma from "@/lib/prisma";

export default async function Home() {
  const data = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-5xl m-auto px-5 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Developer jobs</h1>
        <p className="text-muted-foreground">Find your dream jobs</p>
      </div>
      <section>

        <div className="space-y-4">

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
