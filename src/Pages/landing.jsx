import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {

  const [longUrl,setLongUrl] = useState();
  const navigate = useNavigate()

  const handleShorten =(e) => {
    e.preventDefault ()
    if(longUrl)navigate(`/auth?createNew=${longUrl}`)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-5">
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your loooong URL"
          onChange={ (e) => setLongUrl(e.target.value) }
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full  " type="submit" variant="destructive">
          Shorten URL
        </Button>
      </form>
      <img src="./banner.jpeg" alt="Banner" className="w-full m-11" />

     <Accordion type="multiple" collapsible className="w-full space-y-4">
  <AccordionItem
    value="item-1"
    className="border border-white/10 rounded-xl bg-white/5 backdrop-blur"
  >
    <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-white ">
      How does the Trimrr URL shortener work?
    </AccordionTrigger>
    <AccordionContent className="px-6 pb-5 text-gray-300 leading-relaxed">
      When you enter a long URL, our system generates a shorter
      version of that URL. This shortened URL redirects to the
      original long URL when accessed.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem
    value="item-2"
    className="border border-white/10 rounded-xl bg-white/5 backdrop-blur"
  >
    <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-white ">
      Do I need an account to use the app?
    </AccordionTrigger>
    <AccordionContent className="px-6 pb-5 text-gray-300 leading-relaxed">
      Yes. Creating an account allows you to manage your URLs, view
      analytics, and customize your short URLs.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem
    value="item-3"
    className="border border-white/10 rounded-xl bg-white/5 backdrop-blur"
  >
    <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-white ">
      What analytics are available for my shortened URLs?
    </AccordionTrigger>
    <AccordionContent className="px-6 pb-5 text-gray-300 leading-relaxed">
      You can view the number of clicks, geolocation data of the
      clicks and device types (mobile/desktop) for each of your
      shortened URLs.
    </AccordionContent>
  </AccordionItem>
</Accordion>

    </div>
  );
};

export default LandingPage;
