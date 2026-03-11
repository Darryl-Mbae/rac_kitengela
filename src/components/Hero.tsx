function Hero() {

  const heroData = [
    {
      title: "Wellness Wednesdays",
      description:
        "At Rotaract Club of Kitengela, we believe service starts with caring for ourselves and each other. Every Wellness Wednesday, we share reflections, tips, and conversations about mental wellness and personal growth.",
      buttonText: "Articles",
      link: "https://substack.com/@rotaractclubofkitengela",
      image: "images/wellness.png",
    }
  ];

  const hero = heroData[0];

  return (
    <div className="w-full">
      <div className="mt-5 mb-20 rounded-xl w-full h-[85vh] bg-cranberry"></div>

      <div className="w-full grid-cols-1 lg:grid lg:grid-cols-2 rounded-xl bg-secondary items-center pb-5 lg:pb-0">
        <div className="mx-auto w-full lg:w-[85%] flex flex-col relative p-10">

          <h1 className="pb-6 relative">
            <span className="relative inline-block">
              {hero.title[0]}
              <svg
                width="38"
                height="44"
                viewBox="0 0 68 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-5 -left-4 w-8 h-10 transform scale-x-[-1] -rotate-80"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z" fill="#C1FF07" />
                <path fillRule="evenodd" clipRule="evenodd" d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z" fill="#C1FF07" />
                <path fillRule="evenodd" clipRule="evenodd" d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z" fill="#C1FF07" />
              </svg>
            </span>
            {hero.title.slice(1)}
          </h1>

          <p>{hero.description}</p>

          <button
            onClick={() => window.open(hero.link, "_blank")}
            className="cool-button"
          >
            {hero.buttonText}
          </button>

        </div>

        <div className="w-[90%] lg:w-[60%] lg:pb-0 lg:my-20 mx-auto rounded-xl overflow-hidden aspect-square">
          <img src={hero.image} alt={hero.title} />
        </div>

      </div>
    </div>
  );
}

export default Hero;