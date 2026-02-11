import { useNavigation } from '@react-navigation/native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomIcon } from '../components/ui/CustomIcon';

interface MainLayoutProps {
  title: string;
  subtitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;

  children?: React.ReactNode;
}

const MainLayout = ({
  title,
  subtitle,
  rightAction,
  rightActionIcon,
  children,
}: MainLayoutProps) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<CustomIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;

    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<CustomIcon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={{ paddingTop: top }}>
      <TopNavigation
        title={title}
        subtitle={subtitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: '100%' }}>{children}</Layout>
    </Layout>
  );
};
export default MainLayout;
