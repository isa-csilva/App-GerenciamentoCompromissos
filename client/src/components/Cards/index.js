import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import FormDialog from '../Dialog';


export default function CardCompromisse(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true)
  }

  const formatDate = () => {
    let date = props.date
    let arrayDate = date.split('');

    let year = (arrayDate[0] + arrayDate[1] + arrayDate[2] + arrayDate[3]);
    let month = (arrayDate[5] + arrayDate[6]);
    let day = (arrayDate[8] + arrayDate[9]);
    let newDate = [day, month, year];

    let formattedDate = (newDate.join('/'));
    return formattedDate;
  }

  return (

    <>
    <FormDialog 
      open={open} 
      setOpen={setOpen} 
      id={props.id}
      title={props.title}
      description={props.description}
      date={props.date}
      listCard={props.listCard}
      setListCard={props.setListCard}
    />
    <div className='card--container' onClick={() => handleClickCard()}>
      <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="#6482AD">
                  {props.title}
                </Typography>
                <Typography variant="body1" color="#">
                  {props.description}
                </Typography>
                <Typography variant="body3" color="#6482AD">
                 Para o dia: {formatDate(props.date)}
                </Typography>
              </CardContent>
            </CardActionArea>
        </Card>
    </div>
    </>
    
  );
}