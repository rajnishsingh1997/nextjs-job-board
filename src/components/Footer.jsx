import Link from "next/link";
import Anchor from "./ui/link";

export default function Footer() {
    return (
        <footer className="border-t shadow-sm">
            <div className="max-w-5xl m-auto space-y-5 px-3 py-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-xl font-semibold">Flow Jobs</h3>
                        <p className="text-sm text-muted-foreground">
                            Connecting talents with opportunities
                        </p>
                    </div>
                    <div className="text-sm flex flex-row justify-between text-muted-foreground font-medium ">
                        <Anchor className="hover:underline" href="/about">
                            About Us
                        </Anchor>
                        <Anchor className="hover:underline" href="/contact">
                            Contact
                        </Anchor>
                        <Anchor className="hover:underline" href="/terms">
                            Terms of Service
                        </Anchor>
                        <Anchor  className="hover:underline" href="/privacy">
                            Privacy Policy
                        </Anchor>
                    </div>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Flow Jobs, Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
