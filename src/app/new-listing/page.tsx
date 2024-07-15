import { WorkOS } from "@workos-inc/node"
import { getUser } from "@workos-inc/authkit-nextjs";
import { createCompany } from "../actions/workosActions";

export default async function newListingPage() {
    const { user } = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    async function handleNewCompanyFormSubmit(data: FormData) {
        'use server'
        console.log(data.get('nameOfCompany'))
        if (user) {
            await createCompany(data.get('nameOfCompany') as string, user.id)
        }
    }

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

    return (
        <div className="container">
            <pre>
                {JSON.stringify(organizationMembership, null, 2)}
            </pre>
            <h2 className="text-lg mt-4">Your  Company</h2>
            <p className="text-gray-500 text-sm mb-2">Select company to create a job for</p>
            <div className="border border-blue-300 bg-blue-50 p-4 rounded-md">No Companies found</div>

            <h2 className="text-lg mt-6">Create a New Company</h2>
            <p className="text-gray-500 text-sm mb-2">To Crete a new job listing first need to register a company</p>

            <form action={handleNewCompanyFormSubmit} className="flex gap-2">
                <input type="text" name="nameOfCompany" placeholder="Company Name" className="p-2 border border-gray-400 rounded-md" />
                <button type="submit" className="flex gap-3 items-center bg-gray-200 px-4 py-2 rounded-md">
                    Create a Company
                    {/* <FontAwesomeIcon className="size-4 " icon={faArrowAltCircleRight} /> */}
                </button>
            </form>
        </div>
    );
}