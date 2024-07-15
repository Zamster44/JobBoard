import JobRows from "./JobRows";

export default function Jobs() {
    return (
        <div className="bg-slate-200 py-6 w-full rounded-3xl">
            <div className="container">
                <h2 className="font-bold text-lg mb-4">Recent Jobs</h2>
                <div className="flex flex-col gap-4">
                    <JobRows />
                    <JobRows />
                    <JobRows />
                    <JobRows />
                </div>
            </div>
        </div>
    );
}
