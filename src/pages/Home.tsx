import About from "../components/About";
import FAQs from "../components/FAQs";
import Hero from "../components/Hero";
import JoinUs from "../components/JoinUs";
import Rotaract from "../components/Rotaract";
import Testimonial from "../components/Testimonial";
import SEO from "../components/SEO";
import { usePageImages } from "../hooks/usePageImages";
import { R2_BASE_URL } from "../utils/images";
import { getPageSEO } from "../utils/seo";

export const Home = () => {
    const seo = getPageSEO("home");
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
            <SEO
                title={seo.title}
                description={seo.description}
                canonical={seo.canonical}
                ogImage={seo.ogImage}
                schema={seo.schema}
            />
            <Hero />
            <About />
            {/* <Rotaract /> */}
            <section className="overflow-x-hidden">
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