import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { Info } from "lucide-react"

export function AdvancedSettings() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Accordion type="single" collapsible defaultValue="advanced-settings">
        <AccordionItem value="advanced-settings">
          <AccordionTrigger className="hover:no-underline py-2 font-normal">
            Advanced settings
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2">
            {/* Hide Likes Section */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="hide-likes" className="font-medium">
                  Hide like and view counts on this post
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Only you will see the total number of likes and views
                </p>
              </div>
              <Switch id="hide-likes" />
            </div>
            <p className="text-sm text-muted-foreground -mt-4">
              You can change this later by going to the ... menu at the top of the post.
            </p>
            <button className="flex items-center text-sm text-blue-500 -mt-3">
              <Info className="w-4 h-4 mr-1" />
              Learn more
            </button>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Turn Off Commenting */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="turn-off-comments" className="font-medium">
                  Turn off commenting
                </Label>
              </div>
              <Switch id="turn-off-comments" />
            </div>
            <p className="text-sm text-muted-foreground -mt-4">
              You can change this later by going to the ... menu at the top of your post.
            </p>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Share to Threads */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="share-threads" className="font-medium">
                  Automatically share to Threads
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Always share your posts to Threads
                </p>
              </div>
              <Switch id="share-threads" />
            </div>
            <p className="text-sm text-muted-foreground -mt-4">
              You can change your audience on Threads settings
            </p>
            <button className="flex items-center text-sm text-blue-500 -mt-3">
              <Info className="w-4 h-4 mr-1" />
              Learn more
            </button>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Share to Facebook */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="share-facebook" className="font-medium">
                  Automatically share to Facebook
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Always share your posts to Facebook
                </p>
              </div>
              <Switch id="share-facebook" />
            </div>
            <p className="text-sm text-muted-foreground -mt-4">
              You can change your audience on Facebook settings.
            </p>
            <button className="flex items-center text-sm text-blue-500 -mt-3">
              <Info className="w-4 h-4 mr-1" />
              Learn more
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}