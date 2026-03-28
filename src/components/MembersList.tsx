import { useMemo, useState, useEffect } from 'react';
import { HiMiniArrowDownLeft, HiMiniArrowUpRight } from 'react-icons/hi2';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { FaLinkedin } from 'react-icons/fa';

interface Member {
  id: string;
  name: string;
  profession: string;
  linkedin: string;
  image: string;
  joinDate: string;
  committee: string;
  active: boolean;
  order: number;
}

function MembersList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const q = query(collection(db, "members"));
        const querySnapshot = await getDocs(q);
        const fetchedMembers = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as Member))
          .filter(member => member.active === true)
          .sort((a, b) => a.order - b.order);
        
        setMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching members: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filtered & paginated members
  const filteredMembers = useMemo(() => {
    const filtered = members.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.profession.toLowerCase().includes(search.toLowerCase())
    );
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [members, search, currentPage]);

  const totalFiltered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.profession.toLowerCase().includes(search.toLowerCase())
  ).length;

  const totalPages = Math.ceil(totalFiltered / perPage);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-lg">Loading members...</div>
      </div>
    );
  }

  return (
    <div className="w-full mt-[10vh] lg:mt-[20vh] px-4">
      <div className='grid w-full grid-cols-1 lg:grid-cols-2 mb-8'>
        <h1 className=' relative'>
          <span className="relative inline-block">
            R
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
          otaract Kitengela
          <br />Club Members{" "}
        </h1>
        <div className='lg:hidden mt-2'>Our members are the heart of the Rotaract Club of Kitengela. A diverse group of passionate young leaders, they bring energy, creativity, and commitment to every project and activity.</div>
      </div>

      <div className='w-full flex flex-row items-center justify-between'>
        <div className="flex flex-col lg:flex-row justify-between mt-8 w-full ">
          <input
            type="text"
            placeholder="Search members..."
            className="bg-secondary rounded-[5px] px-4 py-4 mb-4 lg:mb-0 w-full lg:w-1/2"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <div className="flex gap-2 items-center">
            <button
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <HiMiniArrowDownLeft />
            </button>
            <span className='text-secondary'>
              {Math.min(currentPage * perPage, totalFiltered)} out of {totalFiltered} members
            </span>
            <button
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <HiMiniArrowUpRight />
            </button>
          </div>
        </div>
      </div>

      <div id="members" className="w-full px-4 lg:px-0 mx-auto mt-10 rounded-lg relative">
        <div className="grid grid-cols-2 lg:grid-cols-[40%_40%_20%] gap-4 lg:px-6 py-6 border-b border-default cursor-pointer justify-between">
          <div className="font-medium text-tertiary">Name</div>
          <div className="text-secondary">Profession</div>
          <div className="hidden lg:flex text-secondary">LinkedIn</div>
        </div>
        {filteredMembers.map((member) => (
          <div
            onClick={() => member.linkedin && window.open(member.linkedin, '_blank')}
            key={member.id} 
            className="grid grid-cols-2 lg:grid-cols-[40%_40%_20%] gap-4 lg:px-6 py-6 border-b border-default transition-all ease-in cursor-pointer hover:bg-black/5"
          >
            <div className="font-medium text-tertiary">{member.name}</div>
            <div className="text-secondary flex items-end">{member.profession}</div>
            <div className="hidden lg:flex text-secondary items-center">
              {member.linkedin ? (
                <span className="text-xl"><FaLinkedin/></span>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MembersList;