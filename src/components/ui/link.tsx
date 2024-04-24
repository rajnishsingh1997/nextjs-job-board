'use client'
import Link from "next/link";


export default function Anchor(props: React.HTMLProps<HTMLAnchorElement>) {
    return (
        <Link className={props.className} onClick={(e) => { e.preventDefault() }} href='/'>{props.children}</ Link>
    )
}