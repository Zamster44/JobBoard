import JobRows from "./JobRows";

export default function Jobs({header , jobs} : {header:string, jobs:Object[]}) {
    return (
        <div className="bg-slate-200 py-6 w-full rounded-3xl">
            <div className="container">
                <h2 className="font-bold text-lg mb-4">{header || "Recent Jobs"}</h2>
                <div className="flex flex-col gap-4">
                    {!jobs?.length && 
                    <div className="">
                        No Jobs Founded
                    </div>
                    }
                    {jobs && jobs.map(job => (
                    <JobRows jobInfo={job} />
                    ))}
                </div>
            </div>
        </div>
    );
}
