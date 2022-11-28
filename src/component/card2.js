import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ActionAreaCard = ({ name, image, price, description, onClick, style})=> {
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }} onClick={onClick} style={style}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
            />
            <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                {name}
            </Typography>
            <Typography noWrap variant="body2" color="text.secondary">
                {description}
            </Typography>
            </CardContent>
        </CardActionArea>
        <Typography className="align-self-end" component={'span'} style={{ marginTop: 'auto' }}>
            <div className="action" >
                <div className="priceGroup">
                    <p className="price newPrice">RP. {price}</p>
                </div>
                <div className="cart">
                    <svg className="outCart" xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 64 64">
                        <path d="M2 6h10l10 40h32l8-24H16"></path>
                        <circle cx="23" cy="54" r="4"></circle>
                        <circle cx="49" cy="54" r="4"></circle>
                    </svg>
                </div>
            </div>
        </Typography>
    </Card>
  );
}

export default ActionAreaCard