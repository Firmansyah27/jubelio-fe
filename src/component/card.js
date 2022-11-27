import React from 'react'

const Card = (props)=> {
    let CardName = `color_bg ${props.alt}`
    let bg_img = `url(${props.images})`
    let { title, old_price, newPrice, dollar, exp_date } = props
    return (

        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-bhp9pd-MuiPaper-root-MuiCard-root">
            <div className="wrapper">
                <div className={CardName}></div>
                <div className="card_img" style={{ "backgroundImage": bg_img }}></div>
                <div className="cardInfo">
                    <h5 style={{overflow:"hidden"}}>{title}</h5>
                    <div className="action">
                        <div className="priceGroup">
                            <p className="price newPrice">{dollar}{newPrice}</p>
                        </div>
                        <div className="cart">
                            <svg className="outCart" xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 64 64">
                                <path d="M2 6h10l10 40h32l8-24H16"></path>
                                <circle cx="23" cy="54" r="4"></circle>
                                <circle cx="49" cy="54" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card