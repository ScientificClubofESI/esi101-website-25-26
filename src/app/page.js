import Image from "next/image";
import About from "@/components/About";
import UnifiedChatBot from "@/components/UnifiedChatBot";
import ChatBotFloatingButton from "@/components/ChatBotFloatingButton";
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
       {/* Mobile-only ChatBot floating button */}
       <ChatBotFloatingButton className="md:hidden" />
       {/* Unified ChatBot that can be opened from anywhere */}
       <UnifiedChatBot />
       </>
    );
}
