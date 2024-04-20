import Image from "next/image"
import "./Footer.css"
import { assets } from "@/assets"
const Footer = () =>{
    return(
        <>
            <footer className="footer" id="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <Image src={assets.logo} alt=""/>
                        <p>Craving something delicious? Get restaurant meals delivered with just a few taps.</p>
                        <div className="footer-social-icons">
                            <Image src={assets.facebook_icon} alt=""/>
                            <Image src={assets.twitter_icon} alt=""/>
                            <Image src={assets.linkedin_icon} alt=""/>
                        </div>
                    </div>
                    <div className="footer-content-center">
                        <h3>Quick Links</h3>
                        <ul>
                            <li>Home</li>
                            <li>Menu</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="footer-content-right"></div>
                </div>
            </footer>
        </>
    )
}
export default Footer