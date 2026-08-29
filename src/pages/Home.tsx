import About from "../components/About";
import Contact from "../components/Contact";
import FAQs from "../components/FAQs";
import Hero from "../components/Hero";
import JoinUs from "../components/JoinUs";
import Rotaract from "../components/Rotaract";
import Testimonial from "../components/Testimonial";
import { usePageImages } from "../hooks/usePageImages";
import { R2_BASE_URL } from "../utils/images";

export const Home = () => {
    // Preload all hero images and component images
    usePageImages([
        '/images/IMG3.jpg',
        '/images/IMG3-nobg.png',
        '/images/About.JPEG',
        '/images/service1.png',
        '/images/service2.jpg',
        // Gallery images from Rotaract component (first 6 for above-the-fold)
        `${R2_BASE_URL}/img1.jpg`,
        `${R2_BASE_URL}/img2.jpg`,
        `${R2_BASE_URL}/img3.jpg`,
        `${R2_BASE_URL}/img4.jpg`,
        `${R2_BASE_URL}/img5.jpg`,
        `${R2_BASE_URL}/img6.jpg`,
    ]);
    return (
        <>
            <Hero />
            <About />
            <Rotaract />
            <section>
                <Testimonial view="laptop" />
                <JoinUs />
                <Testimonial view="mobile" />
                <FAQs />
                {/* <Contact/> */}
            </section>
        </>
    );
};

export default Home;