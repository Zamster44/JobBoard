import { getUser } from "@workos-inc/authkit-nextjs";
import { createCompany } from "../actions/workosActions";

export default async function NewComapanyPage() {

    const { user } = await getUser();

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

    return (
        <div className="container">
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
    )
}