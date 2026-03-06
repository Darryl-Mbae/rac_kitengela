import { Instagram, Mail, MapPin, Phone } from "lucide-react"
import { BsSubstack } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type Props = {}

const socials = [
  { icon: Instagram, href: "#" },
  { icon: FaWhatsapp, href: "#" },
  { icon: FaXTwitter, href: "#" },
  { icon: BsSubstack, href: "#" },
];

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
              <li>About Us</li>
              <li>Our Projects</li>
              <li>Join Rotaract</li>
              <li>Collaborate</li>
              <li>Events</li>
            </ul>
          </div>

          <div className="my-10">
            <h6>Resources</h6>
            <ul className="text-sm mt-2 text-secondary flex flex-col gap-2">
              <li>Four Way Test</li>
              <li>Rotary Grace</li>
              <li>ByLaws</li>
              <li>Suggestion Box</li>
            </ul>
          </div>

          <div className="w-[120%] lg:w-full my-10">
            <h6>Contact Inforamtion</h6>
            <ul className="text-sm mt-2 text-secondary flex flex-col gap-3">
              <li className="flex flex-row items-center gap-3">
                <div className="border border-default p-2 rounded-full">
                  <Mail className="w-3 h-3" />
                </div>
                info@gmil.com
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
                Kitengela, Kadjiado
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end mt-10">
          <ul className="flex gap-3 text-secondary">
            {socials.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    className="border border-default p-2 rounded-full inline-flex hover:bg-secondary/10 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-between">
        <div className="py-5 text-sm text-center text-secondary">
          &copy;{new Date().getFullYear()} Rotaract Club of Kitengela. <span className="hidden md:inline">All rights reserved.</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="text-xs text-center text-secondary">Designed by <span className="font-bold cursor-pointer">Darryl Mbae</span></div>
        </div>
      </div>

     

    </div>
  )
}

export default Footer