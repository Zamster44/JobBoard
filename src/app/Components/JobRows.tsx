import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import type { Job } from "@/models/Job";
import TimeAgo from "./TimeAgo";
import Link from "next/link";

export default async function JobRows({ jobInfo }: { jobInfo: Job }) {

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 relative">
            {/* <div className="absolute top-2 right-4 cursor-pointer"><FontAwesomeIcon className="size-4 text-gray-400" icon={faHeart} /></div> */}
            <div className=" content-center">
                <img
                    src={jobInfo.jobIcon}
                    alt="logo"
                    className="size-12"
                />
            </div>
            <div className="grow md:flex">
                <div className="grow">
                    <div>
                        <Link href={`/jobs/${jobInfo.orgId}`} className="hover:underline text-gray-500 text-sm">{jobInfo.orgName}</Link>
                    </div>
                    <div className="font-bold text-lg mb-1">
                        <Link className="hover:underline" href={'/show/' + jobInfo._id}>{jobInfo.title}</Link>
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{jobInfo.remote}
                        {" "}&middot;{" "}
                        {jobInfo.city} , {jobInfo.country}
                        {" "}&middot;{" "}
                        {jobInfo.type}

                        {/* <>
                                {" "}&middot;{" "}
                                <Link href={"/jobs/edit/" + jobInfo._id}>Edit</Link>
                                {" "}&middot;{" "}
                                <button>Delete</button>
                            </> */}

                    </div>
                </div>
                {jobInfo.createdAt &&
                    <div className="content-end text-xs text-gray-500"><TimeAgo createdAt={jobInfo.createdAt} /></div>
                }
            </div>

        </div>
    )
}
