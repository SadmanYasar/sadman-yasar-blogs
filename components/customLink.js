import Link from 'next/link'

export default function CustomLink({ as, href, ...otherProps }) {
    return (
        <>
            <Link as={as} href={href} legacyBehavior>
                <a {...otherProps} target='_blank' className='text-purple-400 selection:text-white' />
            </Link>
        </>
    )
}