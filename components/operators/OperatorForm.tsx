"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Mock data for schools
const schools = [
  { value: "school-1", label: "Greenfield Academy" },
  { value: "school-2", label: "Riverside High School" },
  { value: "school-3", label: "Oakwood Elementary" },
  { value: "school-4", label: "Pinecrest Middle School" },
  { value: "school-5", label: "Lakeside International School" },
]

export function OperatorForm({ onSubmit }) {
  const [open, setOpen] = useState(false)
  const [selectedSchools, setSelectedSchools] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior Operator</SelectItem>
              <SelectItem value="senior">Senior Operator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Assigned Schools</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
                {selectedSchools.length > 0 ? `${selectedSchools.length} schools selected` : "Select schools..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search schools..." />
                <CommandList>
                  <CommandEmpty>No schools found.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-auto">
                    {schools.map((school) => (
                      <CommandItem
                        key={school.value}
                        value={school.value}
                        onSelect={() => {
                          setSelectedSchools((prev) =>
                            prev.includes(school.value)
                              ? prev.filter((value) => value !== school.value)
                              : [...prev, school.value],
                          )
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSchools.includes(school.value) ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {school.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedSchools.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSchools.map((value) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                >
                  {schools.find((school) => school.value === value)?.label}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit">Create Operator</Button>
      </DialogFooter>
    </form>
  )
}

