import { useRouter } from "next/router";

function HeaderItem({ title, Icon, location }) {
    const router = useRouter();
    
    return (
        <div 
        onClick={() => router.push(location) }
        className="flex flex-col items-center cursor-pointer group w-12 sm:w-20 hover:text-white">
            <Icon className="h-8 mb-1 group-hover:animate-bounce" />
            <p className="opacity-0 group-hover:opacity-100 tracking-widest">{title}</p>
        </div>
    )
}

export default HeaderItem
