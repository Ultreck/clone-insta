import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { Switch } from "@radix-ui/react-switch";
export function AddCollaborators({user}) {
  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-6">
      {/* Collaborator Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            id="collaborators"
            placeholder="Add collaborators"
            className="flex-1 border-0 shadow-none focus-visible: right-0 focus-within:ring-0 outline-0"
          />

          <HiOutlineUserPlus className="w-4 h-4 mt-2" />
        </div>
      </div>

      {/* Share To Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="share-to" className="border-b-0">
          <AccordionTrigger className="hover:no-underline py-2">
            <div className="flex items-center space-x-2">
              {/* <Share2 className="w-4 h-4 text-gray-500" /> */}
              <span className="font-medium">Share to</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text w-10 h-10 relative bg-gray-100 rounded-full">
                    <img src={user?.photoURL} alt="" className="text rounded-full" />
                  <FaFacebook className="w-5 h-5 text-blue-600 absolute -bottom-3 right-0" />
                </div>
                <div>
                  <p className="font-medium">{user?.displayName}</p>
                  <p className="text-sm text-gray-500">Facebook - Friends</p>
                </div>
              </div>
             <Switch id="share-post" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Accessibility Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="accessibility" className="border-b-0">
          <AccordionTrigger className="hover:no-underline py-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Accessibility</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <p className="text-sm text-gray-600 mb-3">
              Alt text describes your photos for people with visual impairments.
              Alt text will be automatically created for your photos or you can
              choose to write your own.
            </p>
            <Button
              variant="outline"
              className="w-full justify-start text-gray-700"
            >
              Write alt text...
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
