export type StackNavigatorParamsList = {
  TabNavigator: {};
  Test: {
    test: string;
  };
  Modal: {
    content: () => JSX.Element;
    title: string;
  };
  // Auth
  Login: {};
  Register: {};
  // Boarding
  Boarding: {}
};

export type TabNavigatorParamsList = {
  Home: {
    content: () => JSX.Element;
  };
  Sample: {};
  Settings: {
  };
};

export type BoardItemType = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}