export default function Hero () {
    return (
        <section className="container my-12">
            <h1 className="text-2xl font-bold text-center">
                Find Your Next <br /> Dream Job
            </h1>
            {/* <p className="text-gray-600 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quidem totam porro ea sequi. Qui minima in accusamus! Impedit laudantium, incidunt minus consectetur obcaecati aut aliquid culpa eos harum et!
            </p> */}
            <form className="mt-2 flex gap-2 max-w-md mx-auto">
                <input type="search" className="border w-full px-3 py-2" placeholder="Seach Phases ..." />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
            </form>
        </section>
    )
}