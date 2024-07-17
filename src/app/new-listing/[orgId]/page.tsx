import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import JobForms from "@/app/Components/JobForms";

type PageProps = {
    params: {
        orgId: string;
    };
};

export default async function NewListingForOrgpage(props: PageProps) {
    const { user } = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if (!user) {
        return (
            <div className="container">
                <div className="">You Need to be logged in to post a job</div>
            </div>
        );
    }

    const orgId = props.params.orgId;
    const oms = workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: orgId,
    });
    const hasAccess = (await oms).data.length > 0;

    if (!hasAccess) {
        return (
            <div className="container">
                <div className="">Sorry You Do not have access </div>
            </div>
        );
    }

    

    return (
        <JobForms />
    );
}
