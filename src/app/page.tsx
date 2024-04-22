import JobList from "@/components/ui/JobList";
import prisma from "@/lib/prisma";

export default async function Home() {
  const data = await prisma.job.findMany({
    where:{approved:true},
    orderBy:{createdAt:'desc'}
  })
 
  return (
    <main>
    {
  data.map((job)=>{
   return  <JobList job={job} key={job.id} />
  })
    }
    </main>
  );
}
