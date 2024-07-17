import { WorkOS } from "@workos-inc/node"
import { getUser } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";

export default async function newListingPage() {
    const { user } = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if (!user) {
        return (
            <div className="container">
                <div className="">You Need to be logged in to post a job</div>
            </div>
        )
    }

    const organizationMembership = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
    })

    const activeOrganizationMemberships = organizationMembership.data.filter(om => om.status === 'active');
    const organizationsName: { [key: string]: string } = {};
    for (const activeMemberships of activeOrganizationMemberships) {
        const organization = await workos.organizations.getOrganization(activeMemberships.organizationId)
        organizationsName[organization.id] = organization.name;
    }

    return (
        <div className="container">
            <h2 className="text-lg mt-4">Your  Company</h2>
            <p className="text-gray-500 text-sm mb-2">Select company to create a job for</p>
            {organizationMembership.data.length === 0 ? (
                <div className="border border-blue-300 bg-blue-50 p-4 rounded-md">No Companies found</div>
            ) :
                <div className="">
                    <div className="border rounded-md inline-block">
                        {Object.keys(organizationsName).map(orgId => (
                            <Link href={'/new-listing/' + orgId} className={"px-4 py-2 flex gap-2 items-center " 
                                + (Object.keys(organizationsName)[0] === orgId ? "": "border-t")
                            }>
                                {organizationsName[orgId]}
                                <FontAwesomeIcon className="size-4" icon={faCircleRight} />
                            </Link>
                        ))}
                    </div>
                </div>

            }

            <Link className=" inline-flex gap-2 items-center bg-gray-200 px-4 py-2 mt-6 rounded-md "  //inline block why 
                href={'/new-company'}>
                Create a Company
                <FontAwesomeIcon className="size-4" icon={faCircleRight} />
            </Link>
        </div>
    );
}