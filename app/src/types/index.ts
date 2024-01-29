import { Animated } from "react-native";
export type StackNavigatorParamsList = {
  MainDrawer: {};
  AddFamilyMember: {};
  EditFamilyMember: {
    Children: ChildrenType;
  };
  Modal: {
    content: () => JSX.Element;
    title: string;
  };
  // Auth
  Login: {};
  Register: {};
  ForgotPassword: {};
  // Boarding
  Boarding: {}
};

export type TabNavigatorParamsList = {
  Home: {
    content: () => JSX.Element;
  };
  FamilyMembers: {};
  Tasks: {};
  WeeklyMeetings: {};
  RedeemPoints: {};
  Bank: {};
};

export type DrawerNavigatorParamsList = {
  Home: {
    content: () => JSX.Element;
  };
  FamilyMembers: {};
  Tasks: {};
  WeeklyMeetings: {};
  RedeemPoints: {};
  Bank: {};
};

export type BoardItemType = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export type BoardingPaginatorProps = {
  data: BoardItemType[];
  scrollX: Animated.Value;
}

export type BoardingButtonProps = {
  last: boolean;
  scrollToNext: () => void;
  endOfBoarding: () => void;
  handleNavigateToLogin: () => void;
}
export type BoardItemProps = {
  item: BoardItemType;
};

export type UserType = {
  Id: number;
  Username: string;
  Email: string;
}

export type ChildrenType = {
  Id: number;
  Nickname: string;
  BirthDate: Date;
  Age: number;
  Points: number;
}