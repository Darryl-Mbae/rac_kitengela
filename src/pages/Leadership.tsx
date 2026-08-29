import Hero from "../components/Hero";
import BoardMembers from "../components/BoardMembers";
import { usePageImages } from "../hooks/usePageImages";
import MembersList from "../components/MembersList";


export default function Leadership() {
    // Preload all images for this page
    usePageImages([
        '/images/board-pic-web.jpg',
        '/images/board-pic.jpg',
        '/images/board-pic-nobg.png',
        '/images/board-pic-web-nobg.png'
    ]);
    return (
        <>
            <Hero
                title={
                    <>
                        Meet Our <span className="text-[#F7C948]">Leaders</span>
                    </>
                }
                spanColor="#d41367"
                backgroundImage="/images/board-2.jpg"
                mobileBackgroundImage="/images/board-2.jpg"
                mobileOverlayImage="/images/board-2-no-bg.png"
                overlayImage="/images/board-2-no-bg.png"
                mobileImagePosition="object-[-730px_0px]"

            />
            <section>
                <BoardMembers />
                <MembersList />
            </section>
        </>
    );
}