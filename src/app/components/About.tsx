import Image from "next/image"

const About = () => {
  return (
    <section className='max-container padding-container h-screen flex flex-col
    gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row'>
        <div className="about-map" />

        <div className="relative z-20 mt-12 flex flex-col items-start justify-start xl:w-1/2">
            <div className="relative z-20 flex justify-center">
                <h1 className="bold-32 lg:bold-52 px-8 py-2 rounded-full border bg-white">ねこぴーすへようこそ</h1>
            </div>
            <div className="bg-blue-800 bg-opacity-80 flex justify-center px-8 mt-4 rounded-3xl">
              <p className="font-semibold text-3xl my-4 xl:max-w-[520px] text-white">
                  ねこぴーすは世界中から住処のない猫を減らしたいという想いから制作されました。
                  当サイトでは地域で活動する保護団体のみなさまの活動を支援します。  
              </p>
            </div>
        </div>
    </section>
  )
}

export default About