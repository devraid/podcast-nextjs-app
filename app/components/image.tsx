/**
 * @author Miguel Chumillas.
 * @description Image Component.
 */

/** Dependencies. */
import NextImage from 'next/image'

/** Custom loader. */
const customLoader = ({ src }: any) => {
  return src
}

/**
 * Image.
 *
 * @returns {JSX.Element} - The page layout structure.
 */
const Image = (props: any): JSX.Element => {
  return (
    <NextImage
      {...props}
      loader={customLoader}
    />
  )
}

export default Image
