import JobResult from "@/components/jobresult";
import H1 from "@/components/ui/H1";
import JobSidebar from "@/components/ui/JobSidebar";
import { jobFilterValue } from "@/lib/validation";

interface PageProps {
  searchParams: {
    jobName?: string,
    type?: string,
    location?: string,
    remote?: string

  }
}

export default async function Home({
  searchParams: { jobName, type, location, remote }
}: PageProps) {

  const filtervalue: jobFilterValue = {
    jobName,
    type,
    location,
    remote: remote === 'true'
  }

  return (
    <main className="max-w-5xl m-auto px-5 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1 >Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream jobs</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobSidebar />
        <JobResult filterValues={filtervalue} />
      </section>
    </main>
  );
}
