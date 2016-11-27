import React, { PropTypes } from 'react'
import { marginTop20px, center, paddingL18, paddingR5, paddingL0 } from './styles.css'
import { Navigation }  from 'components'

export default function Main (props) {
  return (
    <div className="container-fluid">
        <div className="wraper">
            <div className="header row">
                <div className="col-md-2 col-xs-2 col-lg-2 col-xl-2" style={{"marginTop:": "20px"}}>
                    <a href="http://itcrystals.com/praiera/#menu" id="toggle"><span></span></a>
                    <div id="menu">
                        <ul>
                            <li><a href="http://itcrystals.com/praiera/#home">Home</a></li>
                            <li><a href="http://itcrystals.com/praiera/#about">About</a></li>
                            <li><a href="http://itcrystals.com/praiera/#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-7 col-xs-7 col-lg-7 col-xl-7" style={{"textAlign": "center"}}>
                    <img src={require('./../../images/logo_Praiera_transp.png')} className="img img-responsive" />
                </div>
                <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3 radio-btn">
                    <img src={require('./../../images/radio.png')} className="img img-responsive" />
                    <p className="radio-text">ESTAMOS ENTREGANDO</p>

                </div>
            </div>
            <div className="row main-background">
                <div className="col-md-12 first-heading">
                    <h3>Passo 1/3: <strong>O que voce quer beber?</strong></h3>
                </div>
            </div>
            <div className="row main-background">
                <div className="col-md-6 col-xs-6 col-lg-6 col-xl-6 first-box">
                    <img src={require('./../../images/img_itaipava_shot.png')} className="img img-responsive" />

                    <div className="row first-box-text">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                            <p className="text1">
                                <strong>Itaipava Pilsen</strong><br/> latinha "shot" <br/> 269ml<br/>
                                <strong className="amount">R$ 3,00</strong>
                            </p>
                        </div>
                    </div>
                    <div className="row first-neg-btn">
                        <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3" style={{"paddingLeft": "18px"}}>
                            <button className="btn">-</button>
                        </div>
                        <div className="col-md-5 col-xs-5 col-lg-5 col-xl-5" style={{"paddingRight": "5px"}}>
                            <input type="text" className="btn" />
                        </div>
                        <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3" style={{"paddingLeft": "0px"}}>
                            <button className="btn">+</button>
                        </div>
                    </div>

                </div>
                <div className="col-md-6 col-xs-6 col-lg-6 col-xl-6">
                    <img src={require('./../../images/img_brahma_lt.png')} className="img img-responsive" />
                    <div className="row first-box-text">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                            <p className="text1">
                                Brahma Pilsen<br/> lata <br/> 350ml<br/>
                                <strong className="amount">R$ 3,50</strong>
                            </p>
                        </div>
                    </div>
                    <div className="row first-neg-btn">
                        <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3" style={{"paddingLeft": "18px"}}>
                            <button className="btn">-</button>
                        </div>
                        <div className="col-md-5 col-xs-5 col-lg-5 col-xl-5" style={{"paddingRight": "5px"}}>
                            <p className="btn1">6</p>
                        </div>
                        <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3" style={{"paddingLeft": "0px"}}>
                            <button className="btn">+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row main-background">
                <div className="col-md-6 col-xs-6 col-lg-6 col-xl-6 first-box">
                    <img src={require('./../../images/img_devassa_ln.png')} className="img img-responsive" />

                    <div className="row first-box-text">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                            <p className="text1">
                                <strong>Devassa Loura</strong><br/> long neck <br/> 355ml<br/>
                                <strong className="amount">R$ 5,00</strong>
                            </p>
                        </div>
                    </div>
                    <div className="row first-neg-btn">
                        <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3" style={{"paddingLeft": "18px"}}>
                            <button className="btn">-</button>
                        </div>
                        <div className="col-md-5 col-xs-5 col-lg-5 col-xl-5" style={{"paddingRight": "5px"}}>
                            <p className="btn1">6</p>
                        </div>
                        <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3" style={{"paddingLeft": "0px"}}>
                            <button className="btn">+</button>
                        </div>
                    </div>

                </div>
                <div className="col-md-6 col-xs-6 col-lg-6 col-xl-6">
                    <img src={require('./../../images/img_brahmaex_ln.png')} className="img img-responsive" />
                    <div className="row first-box-text">
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                            <p className="text1">
                                <strong>Brahma weiss</strong><br/> long neck <br/> 355ml<br/>
                                <strong className="amount">R$ 5,50</strong>
                            </p>
                        </div>
                    </div>
                    <div className="row first-neg-btn">
                        <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3" style={{"paddingLeft": "18px"}}>
                            <button className="btn">-</button>
                        </div>
                        <div className="col-md-5 col-xs-5 col-lg-5 col-xl-5" style={{"paddingRight": "5px"}}>
                            <p className="btn1">6</p>
                        </div>
                        <div className="col-md-3 col-xs-3 col-lg-3 col-xl-3" style={{"paddingLeft": "0px"}}>
                            <button className="btn">+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row main-background">
                <div className="col-md-12 produt">
                    <p className="product-btn">Ver mais produtos</p>
                </div>
            </div>
            <div className="row main-background">
                <div className="col-md-12 produt1">
                    <form className="form">
                        <input type="checkbox" /><strong> Levar <span className="btn2">KIT PRAIERA</span> por mais R$ 20,00</strong>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6 col-lg-6 col-xl-6 footer1">
                    <img src={require('./../../images/bt_carrinho.png')} className="img img-responsive footer-img" />
                    <p className="footer-text">valor total <br/> <strong className="footer-price">R$ 147,50</strong></p>
                </div>
                <div className="col-md-6 col-xs-6 col-lg-6 col-xl-6 footer2">
                    <p className="footer-text1"><strong>FINALIZAR</strong><br/> <span className="footer-price">PEDIDO!</span></p>
                    <img src={require('./../../images/bt_next.png')} className="img img-responsive footer-img1" />
                </div>
            </div>
        </div>
    </div>
  )
}