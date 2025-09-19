import Image from "next/image";
import About from "@/components/About";
import ChatBot from "@/components/ChatBot";
import FAQ from "@/components/FAQs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import StudentQA from "@/components/StudentQ&A";


export default function Home(){
    return(
       <>
       <NavBar/>
       <div className="h-20 md:h-24"></div> {/* spacing between the navbar and the item below it (re-adjust height if necessary) */}
       <Hero/>
       <About/>
       <StudentQA/>
       <FAQ/>
       <Footer/> 
       </>
    );
}
