import React from 'react';
import { parseISO, format, isValid } from 'date-fns';

interface DateProps {
  dateString?: string;
}

export default function DateRenderer({ dateString }: DateProps) {
  if (!dateString) return null;
  const date = parseISO(dateString);
  if (!isValid(date)) {
    return <span className="text-gray-400">{dateString}</span>;
  }
  return (
    <time className="text-gray-400" dateTime={dateString}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
}
