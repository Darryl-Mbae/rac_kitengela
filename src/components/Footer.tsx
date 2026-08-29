import { Mail, MapPin } from "lucide-react"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import SocialLinks from "./SocialLinks";
import ResourceModal from "./ResourceModal";
import { useResources } from "../hooks/useResources";
import type { Resource } from "../hooks/useResources";



function Footer() {
  const [slogan, setSlogan] = useState<string>("Rotaract - Service Above Self");
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { resources } = useResources();

  useEffect(() => {
    const fetchSlogan = async () => {
      try {
        const docRef = doc(db, "settings", "slogan");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.text) {
            setSlogan(data.text);
          }
        }
      } catch (error) {
        console.error("Error fetching slogan:", error);
        // Falls back to default slogan
      } finally {
        setLoading(false);
      }
    };

    fetchSlogan();
  }, []);

  const handleResourceClick = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      setSelectedResource(resource);
      setModalOpen(true);
    }
  };

  return (
    <div className="w-full mt-[10vh] text-white mx-auto py-10 px-[7%] lg:px-[4%] bg-primary">
      <div className="hidden md:flex py-5 border-b border-white/40 flex-row justify-between lg:items-center">
        <div>
          <img
            src="/images/logo-white.png"
            alt="logo"
            className="h-18 w-auto -ml-3"
          />
        </div>
        <div>{loading ? "Loading..." : slogan}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] border-b border-white/40 pb-5">
        <div className="grid grid-cols-2  lg:grid-cols-3 ">
          <div className=" my-10 ">
            <h6>Quick Links</h6>
            <ul className="text-sm mt-2 text-white/90 flex flex-col gap-2">
              <li className="cursor-pointer hover:ml-1 transition-all">
                <Link to="/" className="block">Home</Link>
              </li>
              <li className="cursor-pointer hover:ml-1 transition-all">
                <Link to="/about" className="block">About Us</Link>
              </li>
              <li className="cursor-pointer hover:ml-1 transition-all">
                <Link to="/leadership" className="block">Leadership</Link>
              </li>
               <li className="cursor-pointer hover:ml-1 transition-all">
                <Link to="/events" className="block">Events</Link>
              </li>
               <li className="cursor-pointer hover:ml-1 transition-all">
                <Link to="/membership" className="block">Membership</Link>
              </li>
             
            </ul>
          </div>

          <div className="my-10">
            <h6>Resources</h6>
            <ul className="text-sm mt-2 text-white/90 flex flex-col gap-2">
              <li 
                className="cursor-pointer hover:ml-1 transition-all"
                onClick={() => handleResourceClick("four-way-test")}
              >
                Four Way Test
              </li>
              <li 
                className="cursor-pointer hover:ml-1 transition-all"
                onClick={() => handleResourceClick("rotary-grace")}
              >
                Rotary Grace
              </li>
              <li 
                className="cursor-pointer hover:ml-1 transition-all"
                onClick={() => window.open("https://via.placeholder.com/bylaws.pdf", "_blank")}
              >
                ByLaws
              </li>
              <li 
                className="cursor-pointer hover:ml-1 transition-all"
                onClick={() => window.open("https://via.placeholder.com/constitution.pdf", "_blank")}
              >
                Club Constitution
              </li>
            </ul>
          </div>

          <div className="w-[120%] lg:w-full my-10">
            <h6>Contact Information</h6>
            <ul className="text-sm mt-2 text-white/90 flex flex-col gap-3">
              <li className="flex flex-row items-center gap-3">
                <div className="border border-default p-2 rounded-full">
                  <Mail className="w-3 h-3" />
                </div>
                rackitengela@rotaractdistrict9216.org              </li>
              {/* <li className="flex flex-row items-center gap-3">
                <div className="border border-default p-2 rounded-full">
                  <Phone className="w-3 h-3" />

                </div>
                +254712345678
              </li> */}
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
            className="text-white/90"
            filterPlatforms={['Instagram', 'Tiktok', 'Substack']}
          />
        </div>

      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-between">
        <div className="py-5 text-sm text-center text-white/90">
          &copy;{new Date().getFullYear()} Rotaract Club of Kitengela. <span className="hidden md:inline">All rights reserved.</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="text-xs text-center text-white/90">Designed by <span onClick={() => window.open("https://darryl-mbae.netlify.app", "blank")} className="font-bold cursor-pointer">Darryl Mbae</span></div>
        </div>
      </div>

      <ResourceModal 
        isOpen={modalOpen} 
        resource={selectedResource} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  )
}

export default Footer