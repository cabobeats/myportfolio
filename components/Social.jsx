import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/cabobeats" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/ivan-rodr%C3%ADguez-32a92819a/" },
  { icon: <FaYoutube />, path: "https://www.youtube.com/@cabobeatz" },
  { icon: <FaTwitter />, path: "https://x.com/BeatsCabo" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
