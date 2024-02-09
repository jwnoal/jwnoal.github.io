// @ts-ignore
import image from "../assets/social.png";
// @ts-ignore
import pic from "../assets/ascii.png";

export interface Author {
    firstname: string;
    bio: string;
    profilePic: any;
    os?: string;
    shell?: string;
    lastname: string;
    socials: Socials[];
}

export interface Socials {
    name: string;
    link: string;
}

export interface Site {
    lang: string;
    rssTitle: string;
    siteName: string;
    title: string;
    description: string;
    image: any;
    twitterCreator: string;
    author: Author;
}

export const site: Site = {
    lang: "zh",
    rssTitle: "soymilk blog posts",
    siteName: "jiangwei.zone",
    title: "Welcome to my personal website.",
    description:
        "This is my personal website, where I post news and some other cool stuff.",
    image: image,
    twitterCreator: "",
    author: {
        os: "ArchLinux",
        profilePic: pic,
        shell: "Zsh",
        bio: "I'm a web developer who loves making stuff and woodworking.",
        firstname: "jw",
        lastname: "noal",
        socials: [
            {
                name: "github",
                link: "https://github.com/jwnoal/jwnoal.github.io",
            },
        ],
    },
};
