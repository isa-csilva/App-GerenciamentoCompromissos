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

  return (

    <>
    <FormDialog 
      open={open} 
      setOpen={setOpen} 
      listCard={props.listCard}
      setListCard={props.setListCard}
      id={props.id}
      title={props.title}
      description={props.description}
      date={props.date}
      
    />
    <div className='card--container' onClick={() => handleClickCard()}>
      <Card sx={{ maxWidth: 300, minWidth: 100 , marginBottom: 2 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="#6482AD">
                  {props.title}
                </Typography>
                <Typography variant="body1" color="#">
                  {props.description}
                </Typography>
                <Typography variant="body3" color="#6482AD">
                 Para o dia: {props.date}
                </Typography>
              </CardContent>
            </CardActionArea>
        </Card>
    </div>
    </>
    
  );
}