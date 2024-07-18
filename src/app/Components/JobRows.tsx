'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import type { Job } from "@/models/Job";
import TimeAgo from 'react-timeago';

export default function JobRows({ jobInfo }: { jobInfo: Job }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 relative">
            <div className="absolute top-2 right-4 cursor-pointer"><FontAwesomeIcon className="size-4 text-gray-400" icon={faHeart} /></div>
            <div className=" content-center">
                <img
                    src={jobInfo.jobIcon}
                    alt="logo"
                    className="size-12"
                />
            </div>
            <div className="grow md:flex">
                <div className="grow">
                    <div className="text-gray-500 text-sm">{jobInfo.orgName}</div>
                    <div className="font-bold text-lg">{jobInfo.title}</div>
                    <div className="text-xs text-gray-400">{jobInfo.remote} &middot; {jobInfo.city} , {jobInfo.country} &middot; {jobInfo.type} </div>
                </div>
                {jobInfo.createdAt &&
                    <div className="content-end text-xs text-gray-500"><TimeAgo date={jobInfo.createdAt} /></div>
                }
            </div>

        </div>
    )
}
