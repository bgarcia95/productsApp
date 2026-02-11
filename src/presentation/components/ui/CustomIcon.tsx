import { StyleSheet } from 'react-native';

import { Icon, useTheme } from '@ui-kitten/components';

interface CustomIconProps {
  name: string;
  color?: string;
  white?: boolean;
}

export const CustomIcon = ({ name, color, white = false }: CustomIconProps) => {
  const theme = useTheme();

  if (white) {
    color = theme['color-info-100'];
  } else if (color) {
    color = theme[color];
  } else {
    color = theme['text-basic-color'];
  }

  return <Icon name={name} fill={color} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
