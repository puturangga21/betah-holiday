'use client';

import React, { useState } from 'react';

import { format } from 'date-fns';
import { Users } from 'lucide-react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function FormActivity({
  title,
  price,
}: {
  title: string;
  price: number;
}) {
  const [date, setDate] = useState<Date>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const total = formData.get('total');

    console.log(
      `Saya ingin melakukan reservasi untuk aktivitas "${title}" untuk ${total} orang pada tanggal ${date ? format(date, 'yyyy-MM-dd') : 'belum dipilih'}.`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <InputGroup className="h-10 gap-4 rounded-full">
          <InputGroupInput
            name="total"
            placeholder="Adult 1x"
          />
          <InputGroupAddon>
            <Users />
          </InputGroupAddon>
        </InputGroup>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground h-10 w-full items-center justify-start gap-6 rounded-full">
              <CalendarIcon />
              {date ? format(date, 'd MMM yyyy') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </PopoverContent>
        </Popover>

        <Button className="h-10 w-full rounded-full">Check availability</Button>
      </div>
    </form>
  );
}
