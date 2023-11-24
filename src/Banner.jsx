
const Banner = () => {
    return (
        <div className="flex bg-[#f0f7ff] p-4 rounded-2xl">
            <div className="w-1/2 my-auto">
                <h2 className="text-2xl lg:text-4xl font-bold">CrowdChoice: Your Voice, Your Impact</h2>
                <p className="text-xl mt-5">Welcome to CrowdChoice, where opinions converge to shape decisions! Join our community, participate in surveys, and be a part of the collective voice that influences change. Your choices matter, and together, we make decisions that resonate. Empower your voice, engage with the crowd, and be a force for positive change. Let&apos;s choose together with CrowdChoice</p>
                <button className="btn bg-[#ff715b] text-[#FFF] mt-5">Explore</button>
            </div>
            <div className="w-1/2">
            <img src="https://i.ibb.co/5c1qyg0/primalogik-opinion-survey-hero-980x680.png" alt="" />
            </div>
        </div>
    );
};

export default Banner;