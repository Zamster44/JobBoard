import Jobs from "@/app/Components/Jobs";
import { JobModel } from "@/models/Job";
import { AutoPaginatable, Organization, OrganizationMembership, WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import { getUser } from "@workos-inc/authkit-nextjs";



type PageProps = {
    params: {
        orgId: string;
    };
};

export default async function CompanyJobPages(props: PageProps) {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(props.params.orgId);
    const {user} = await getUser();
    await mongoose.connect(process.env.MONGO_URI as string)
    const jobDocs = JSON.parse(JSON.stringify(await JobModel.find({orgId: org.id})));
    let oms:AutoPaginatable<OrganizationMembership>|null = null;
    if(user){
        oms = await workos.userManagement.listOrganizationMemberships({
            userId : user.id,
        });
    }
    for(const job of jobDocs){
        const org = await workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;
        if(oms && oms.data.length > 0){
            job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId);
        }
    }
    return (
        <div className="">
            <div className="container">
                <h1 className="test-xl my=6">{org.name} Jobs</h1>
            </div>
            <Jobs jobs={jobDocs} header={"Jobs posted by "+ org.name}/>
        </div>
    )
}