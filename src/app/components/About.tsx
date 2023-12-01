import Image from "next/image"

const About = () => {
  return (
    <section className='max-container padding-container h-screen flex flex-col
    gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row'>
        <div className="about-map animate-fade-in" />

        <div className="relative z-20 mt-12 flex flex-col items-start justify-start w-full">
            <div className="relative flex justify-center">
              <div className="h-[92px] w-[250px] ml-8 animate-text-focus-in px-8 py-2 text-white">
                <Image src={'/Logo.svg'} alt="logo" className="pb-4" fill />
              </div>
              <div className="animate-text-focus-in flex text-white bold-40 items-center">
                へようこそ
              </div>
            </div>
            <div className="flex justify-center px-8 rounded-3xl xl:max-w-[680px]">
              <p className="animate-text-focus-in-3 font-semibold text-2xl text-white">
                  ねこぴーすは世界中から住処のない猫を減らしたいという想いから制作されました。
                  当サイトでは地域で活動する保護団体のみなさまの活動を支援します。  
              </p>
            </div>
        </div>
    </section>
  )
}

export default About