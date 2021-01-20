import React from 'react';



function Footer(){
    const currentYear = new Date().getFullYear();
    return (
    <footer>
        <p>Copyright by Abhijeet Wankhade ⓒ{currentYear}</p>
    </footer>
    );
}


export default Footer;