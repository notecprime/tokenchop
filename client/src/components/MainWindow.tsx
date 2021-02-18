import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAppContext } from '../slices/appContextSlice';
import IntroWindow from './IntroWindow';
import TradeWindow from './TradeWindow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'

    },
    instructions: {
      width: '100%',
      height: '1000%',
      display: 'flex',
      flexDirection: 'column'
    },
    message: {
      marginTop: '40px',
      marginBottom: theme.spacing(1),
      fontSize: '18px',      
    }
  }),
);

function getStepContent(stepIndex: number, classes: any, errorReason: string) { 
  switch (stepIndex) {
    case -1:
      return <Typography color="error" className={classes.message}>{errorReason}</Typography>;
    case 0:
      return <IntroWindow></IntroWindow>;
    case 1:
    case 2:      
      return <TradeWindow></TradeWindow>;
  }
}

export default function MainWindow() {
  const classes = useStyles();
  const { stepperStage, errorReason = '' } = useSelector(selectAppContext);
  const steps = ['Connect', 'Select', 'CHOP!'];

  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        {getStepContent(stepperStage, classes, errorReason)}
      </div>
    </div>
  );
}