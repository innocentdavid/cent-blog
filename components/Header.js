import Image from "next/image";
import HeaderItem from "./HeaderItem";
import {
    BadgeCheckIcon,
    CollectionIcon,
    HomeIcon, LightningBoltIcon, SearchIcon, UserIcon
} from "@heroicons/react/outline";

function Header() {    
    return (
        <header className="flex flex-col sm:flex-row sm:m-5 justify-between items-center h-auto">
            <div className="flex flex-grow justify-evenly max-w-2xl">
                <HeaderItem title="HOME" Icon={HomeIcon} location="/" />
                <HeaderItem title="HOME" Icon={LightningBoltIcon} location="/" />
                <HeaderItem title="HOME" Icon={BadgeCheckIcon} location="/" />
                <HeaderItem title="HOME" Icon={CollectionIcon} location="/" />
                <HeaderItem title="HOME" Icon={SearchIcon} location="/" />
                <HeaderItem title="HOME" Icon={UserIcon} location="/" />
            </div>
            <a href="/"><Image
            className="object-contain"
            src="https://links.papareact.com/ua6"
            width={200} 
            height="auto"
            alt="" /></a>
        </header>
    )
}

export default Header
