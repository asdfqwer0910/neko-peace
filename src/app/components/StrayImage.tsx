import Link from "next/link";

const StrayImage = () => {
    return (
        <div className="flex flex-col justify-end max-container padding-container h-[350px] gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
            <div className="absolute right-0 top-0 h-[350px] w-screen bg-stray-banner bg-cover bg-center animate-fade-in"/>
            <div className="flex flex-col relative justify-center">
                <div className="animate-tracking-in-contract-bck text-4xl font-extrabold text-white">
                    猫が安心して暮らせる場所を見つけよう
                </div>
                <div className="flex justify-center my-6">
                    <Link href="/adoption/insert">
                        <button className="border-2 bg-sky-500 rounded-sm font-bold text-white py-2 w-32 hover:bg-blue-700 animate-tracking-in-expand">
                            猫の登録へ
                        </button>
                    </Link>
                </div>
            </div>
        </div>   
    )
}

export default StrayImage