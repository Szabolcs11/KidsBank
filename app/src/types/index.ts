import { Animated } from "react-native";
import { string } from "yup";
export type StackNavigatorParamsList = {
  MainDrawer: {};
  AddFamilyMember: {};
  EditFamilyMember: {
    Children: ChildrenType;
  };
  AddTask: {};
  EditTask: {
    Task: TaskType;
    user?: UserType;
  };
  AddWeeklyMeeting: {};
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

export interface DropdownChildernType extends ChildrenType {
  label: string;
  value: number;
}

export type TaskType = {
  Id: number;
  ChildId: number;
  ChildName: string;
  Name: string;
  Deadline: Date;
  Points: number;
}