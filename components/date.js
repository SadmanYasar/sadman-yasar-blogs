import { parseISO, format } from 'date-fns';

export default function Date(props) {
    const dateString = props?.dateString;
    if (!dateString) return null;
    const date = parseISO(dateString);
    return <time className='text-gray-400' dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}