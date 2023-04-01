import { Link } from "react-router-dom"
import Button from "../Button"

interface Props {
  title: string,
  subtitle: string,
  p?: string,
  button?: string,
  link?: string,
  children: React.ReactNode
}
export default function ProductSection({
  title,
  subtitle,
  p, children, button, link
}: Props) {
  return (
    <section className="pt-10 lg:pt-20 pb-4">
      <div className="uppercase font-normal text-base ">{p}</div>
      <h2 className="font-russo font-normal text-4xl lg:text-5xl">{title}</h2>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
        <p className="font-normal text-lg mb-1 md:mb-0">{subtitle} </p>
        {button && <Link to={`${link}`}>
        <Button>{button}</Button></Link>}
      </div>
      <div >
        {children}
      </div>
    </section>
  )
}
