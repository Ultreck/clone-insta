import React from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
const InstagramSuggestionsHeader = () => {
  const suggestions = [
    {
      username: "Jude",
      followedBy: ["dprinceajetunmobi"],
      isVerified: false,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      username: "Kelvin Obiora",
      followedBy: ["official_pamtel", "shy_le"],
      isVerified: true,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      username: "gawiel",
      followedBy: ["Oempress", "official_pamtel"],
      isVerified: false,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      username: "tomiwa_aj",
      followedBy: ["dprince", "official_pamtel"],
      isVerified: true,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      username: "chioma_o",
      followedBy: ["ajetunmobi", "shy_le"],
      isVerified: false,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      username: "official_pamtel",
      followedBy: ["dprince", "Oempress"],
      isVerified: true,
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      username: "dprince",
      followedBy: ["ajetunmobi", "shy_le"],
      isVerified: false,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      username: "ajetunmobi",
      followedBy: ["official_pamtel", "Opress"],
      isVerified: false,
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center px-4 py-3">
        <h3 className="font-semibold text-sm">Suggestions For You</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-500 hover:text-blue-600"
        >
          See All
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 2,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1 gap-2 py-2 px-5">
          {suggestions.map((user, index) => (
            <CarouselItem key={index} className="pl-1 basis-3/5 lg:basis-2/5">
              <Card className="border-0 rounded shadow-none p-0">
                <CardContent className="flex flex-col items-center p-4">
                  <div className="relative mb-3">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="text-center mb-3">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      Followed by {user.followedBy.slice(0, 2).join(", ")}
                      {user.followedBy.length > 2 && "..."}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs text-blue-500 hover:text-blue-600 hover:bg-blue-400/5"
                  >
                    Follow
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 h-6 w-6" />
        <CarouselNext className="right-1 h-6 w-6" />
      </Carousel>
    </div>
  );
};

export default InstagramSuggestionsHeader;
