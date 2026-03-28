import { Mail, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";

type Props = {}

function Footer({ }: Props) {
  return (
    <div className="mt-[10vh] w-[90%] mx-auto rounded-3xl py-10 px-[7%] lg:px-[4%] bg-secondary mb-4">
      <div className="py-5 border-b border-default flex lg:flex-row flex-col justify-between lg:items-center">
        <div>Logo</div>
        <div>slogan</div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] border-b border-default pb-5">
        <div className="grid grid-cols-2  lg:grid-cols-3 ">
          <div className=" my-10 ">
            <h6>Quick Links</h6>
            <ul className="text-sm mt-2 text-secondary flex flex-col gap-2">
              <Link to={"/about"}><li>About Us</li></Link>
              <Link to={"/events"}><li>Events</li></Link>
              <Link to={"/contact"}><li>Join Rotaract</li></Link>
              <Link to={"/members"}><li>Members</li></Link>
              <Link to={"/gallery"}><li>Gallery</li></Link>

            </ul>
          </div>

          <div className="my-10">
            <h6>Resources</h6>
            <ul className="text-sm mt-2 text-secondary flex flex-col gap-2">
              <li>Four Way Test</li>
              <li>Rotary Grace</li>
              <li>ByLaws</li>
              <Link to={"/contact"}><li>Suggestion Box</li></Link>
            </ul>
          </div>

          <div className="w-[120%] lg:w-full my-10">
            <h6>Contact Information</h6>
            <ul className="text-sm mt-2 text-secondary flex flex-col gap-3">
              <li className="flex flex-row items-center gap-3">
                <div className="border border-default p-2 rounded-full">
                  <Mail className="w-3 h-3" />
                </div>
                info@gmail.com
              </li>
              <li className="flex flex-row items-center gap-3">
                <div className="border border-default p-2 rounded-full">
                  <Phone className="w-3 h-3" />

                </div>
                +254712345678
              </li>
              <li className="flex flex-row items-center gap-3">
                <div className="border border-default p-2 rounded-full">
                  <MapPin className="w-3 h-3" />
                </div>
                Kitengela, Kajiado
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end mt-10">
          <SocialLinks 
            variant="footer" 
            className="text-secondary"
            filterPlatforms={['Instagram', 'WhatsApp', 'LinkedIn', 'Substack']}
          />
        </div>

      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-between">
        <div className="py-5 text-sm text-center text-secondary">
          &copy;{new Date().getFullYear()} Rotaract Club of Kitengela. <span className="hidden md:inline">All rights reserved.</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="text-xs text-center text-secondary">Designed by <span onClick={()=> window.open("https://darryl-mbae.netlify.app","blank")} className="font-bold cursor-pointer">Darryl Mbae</span></div>
        </div>
      </div>

     

    </div>
  )
}

export default Footer