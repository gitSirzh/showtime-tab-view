import { Platform } from "react-native";

import {
  runOnJS,
  scrollTo,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

export function _ScrollTo(ref: any, x: number, y: number, animated: boolean) {
  "worklet";
  if (!ref) return;
  scrollTo(ref, x, y, animated);
}

export const isIOS = Platform.OS === "ios";

export const animateToRefresh = ({
  transRefreshing,
  isRefreshing,
  isRefreshingWithAnimation,
  isToRefresh,
  destPoi,
  onStartRefresh,
}: {
  transRefreshing: SharedValue<number>;
  isRefreshing: SharedValue<boolean>;
  isRefreshingWithAnimation: SharedValue<boolean>;
  isToRefresh: boolean;
  destPoi: number;
  onStartRefresh?: () => void;
}) => {
  "worklet";

  if (isToRefresh === true && isRefreshing.value === true) return;
  if (
    isToRefresh === false &&
    isRefreshing.value === false &&
    transRefreshing.value === destPoi
  )
    return;
  isRefreshing.value = isToRefresh;
  if (isToRefresh && onStartRefresh) {
    runOnJS(onStartRefresh)();
  }

  if (transRefreshing.value === destPoi) {
    isRefreshingWithAnimation.value = isToRefresh;
    return;
  }
  transRefreshing.value = withTiming(destPoi, undefined, () => {
    isRefreshingWithAnimation.value = isToRefresh;
  });
};
