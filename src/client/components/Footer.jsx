import React, {Component} from 'react';
import classnames from 'classnames';
import Center from './Center';
const styles = (typeof CSS !== 'undefined') && require('./Footer.css');

class Footer extends Component {
    render () {
        return (
            <footer>
                <Center vertical>
                <div className="container footer">
                    <p>&copy; Grace Covenant Church</p>

                    <div className="icons">
                        <a target="_blank" className="footerLinks" href="https://www.facebook.com/gracecovenant/"><i className="fa fa-facebook fa-2x"></i></a>
                        <a target="_blank" className="footerLinks" href="https://twitter.com/gccphiladelphia"><i className="fa fa-twitter fa-2x"></i></a>
                        <a target="_blank" className="footerLinks" href="https://www.instagram.com/gccphiladelphia/"><i className="fa fa-instagram fa-2x"></i></a>
                    </div>
                </div>
                </Center>
            </footer>
        )
    }

}

export default Footer;
