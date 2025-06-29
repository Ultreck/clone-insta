import React, { useCallback, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import { Button } from "../components/ui/button";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cn } from "../lib/utils";
import cities from "cities-list";
import { useDebounce } from "../lib/helper";

const LocationInputField = ({ setLocation }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(searchTerm || "");

  const cityArray = useMemo(() => Object.keys(cities), []);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredCities = useMemo(() => {
    if (!debouncedSearch) return [];
    return cityArray
      .filter((city) =>
        city.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .slice(0, 250);
  }, [debouncedSearch, cityArray]);

  const handleCitySelect = useCallback(async (cityName) => {
    try {
      setLocation(cityName);
    } catch (err) {
      console.error(`Failed to fetch weather for ${cityName}`, err);
    }

    setSelectedCity(cityName);
    setSearchTerm("");
  }, []);

  return (
    <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={openDropdown}
          disabled={false}
          className="lg:w-full text-black mt-2 py-4 focus-visible:ring-1 cursor-pointer bg-gray-100 hover:bg-slate-50 justify-between"
        >
          {selectedCity ? selectedCity : "Add location..."}
          <CiLocationOn className="h-4 w-4 shrink-0 opacity-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search for location..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className=""
          />
          <CommandList>
            <CommandEmpty>Type to search for location...</CommandEmpty>
            <CommandGroup className="p-0 ">
              <ScrollArea className=" pb-5 px-0">
                {searchTerm ? (
                  filteredCities.map((cityName) => (
                    <CommandItem
                      key={cityName}
                      value={cityName}
                      onSelect={() => handleCitySelect(cityName)}
                      className={` flex rounded-none ${
                        selectedCity?.name === cityName && "bg-gray-100"
                      } justify-between  `}
                    >
                      <div
                        className={`text-base  flex justify-between items-center w-full`}
                      >
                        {cityName}
                        <div className={`text  flex items-center space-x-2`}>
                          <Check
                            className={cn(
                              "h-5 w-5 text-xl",
                              selectedCity?.name === cityName
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </div>
                      </div>
                    </CommandItem>
                  ))
                ) : (
                  <></>
                )}

                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationInputField;
