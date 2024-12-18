import { useCallback, useRef } from "react";
import { runOnUI, useSharedValue } from "react-native-reanimated";
import { useHeaderTabContext } from "../context";
import { _ScrollTo } from "../utils";
export const useSyncInitialPosition = ref => {
  const opacityValue = useSharedValue(0);
  const isInitiated = useRef(true);
  const {
    headerHeight,
    minHeaderHeight
  } = useHeaderTabContext();
  const initialPosition = useCallback(position => {
    if (!isInitiated.current) return;
    isInitiated.current = false;
    runOnUI(_ScrollTo)(ref, 0, Math.min(position, headerHeight - minHeaderHeight), false);
    opacityValue.value = 1;
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [headerHeight, minHeaderHeight, ref]);
  return {
    opacityValue,
    initialPosition
  };
};
//# sourceMappingURL=use-sync-initial-position.js.map