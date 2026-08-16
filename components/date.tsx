import React from 'react';
import { parseISO, format } from 'date-fns';

interface DateProps {
  dateString?: string;
}

export default function DateRenderer({ dateString }: DateProps) {
  if (!dateString) return null;
  const date = parseISO(dateString);
  return (
    <time className="text-gray-400" dateTime={dateString}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
}
