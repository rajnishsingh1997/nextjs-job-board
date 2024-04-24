"use client"
import { useFormStatus } from "react-dom"
import { Button } from './ui/button'
import { Loader2 } from "lucide-react"


export default function FormSubmitButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { pending } = useFormStatus()

    return (
        <Button {...props} type="submit" disabled={pending || props.disabled}>
            <span className="flex items-center justify-center gap-2">
                {props.children}
                {pending && <Loader2 size={16} className="animate-spin" />}
            </span>
        </Button>
    )
}