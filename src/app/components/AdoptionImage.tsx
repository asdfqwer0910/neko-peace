const AdoptionImage = () => {
    return (
        <div className="flex flex-col justify-end max-container padding-container h-[350px] gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
            <div className="absolute right-0 top-0 h-[350px] w-screen bg-adoption-banner bg-cover bg-center"/>
            <div className="flex flex-col relative">
                <div className="text-4xl font-extrabold text-white">猫が安心して暮らせる場所を見つけよう</div>
                <div></div>
            </div>
        </div>
    )
}

export default AdoptionImage