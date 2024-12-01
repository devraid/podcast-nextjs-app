'use client'
/**
 * @author Miguel Chumillas.
 * @description Header Component.
 */

/** Dependencies. */
import Link from 'next/link'

/**
 * Header component.
 *
 * @returns {JSX.Element} - The rendered header component.
 */
const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-4">
      <Link
        href="/"
        className="text-lg font-bold text-blue-500"
      >
        Podcaster
      </Link>
    </header>
  )
}

export default Header
