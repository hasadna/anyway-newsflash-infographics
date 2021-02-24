import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { HeaderVariant } from '../../../services/widgets.style.service';
import RoadNumberImage from './RoadNumberImage';
import LamasImage from '../../../assets/cbs.png';
import AnywayImage from '../../../assets/anyway.png';
import { Typography, Logo } from '../../atoms';

interface IProps {
  variant: HeaderVariant;
  text: string | undefined;
  road: number;
}
const CardHeader: FC<IProps> = ({ variant, road, text }) => {
  let headerContent = null;
  let textLine1;
  let textLine2;
  const textWordsArr = text?.split(' ');
  const textWordLength = textWordsArr?.length;
  if (textWordLength && textWordLength > 5) {
    const indexToSplit = textWordLength / 2;
    textLine1 = textWordsArr?.slice(0, indexToSplit).join(' ');
    textLine2 = textWordsArr?.slice(indexToSplit).join(' ');
  }

  switch (variant) {
    case HeaderVariant.Centered:
      headerContent = (
        <Box display="flex" alignItems="center" flex={1}>
          <RoadNumberImage roadNumber={road} />
          <Box display="flex" flexDirection="column" flex={1} textAlign="center">
            <Typography.Body1>{textLine1 ? textLine1 : text}</Typography.Body1>
            {textLine2 && <Typography.Body1>{textLine2}</Typography.Body1>}
          </Box>
        </Box>
      );
      break;
    case HeaderVariant.Logo:
      headerContent = (
        <Box display="flex" flex={1}>
          <RoadNumberImage roadNumber={road} />
          <Box display="flex" flex={1} justifyContent="flex-end" alignItems="flex-end" height={30}>
            <Logo src={LamasImage} alt={'Lamas'} height={30} />
            <Logo src={AnywayImage} alt={'Anyway'} height={20} />
          </Box>
        </Box>
      );
      break;
  }

  return (
    <Box height="100%" width="100%" display="flex">
      {headerContent}
    </Box>
  );
};
export default CardHeader;
