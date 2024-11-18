import React from "react";
import type { TabHeaderContext } from "./types";
export declare const HeaderTabContext: React.Context<TabHeaderContext>;
export declare const useHeaderTabContext: () => {
    isSlidingHeader: import("react-native-reanimated").SharedValue<boolean>;
    shareAnimatedValue: import("react-native-reanimated").SharedValue<number>;
    isStartRefreshing: import("react-native-reanimated").SharedValue<boolean>;
    minHeaderHeight: number;
    tabbarHeight: number;
    headerHeight: number;
    scrollStickyHeaderHeight: number;
    refreshHeight: number;
    overflowPull: number;
    pullExtendedCoefficient: number;
    headerTrans: import("react-native-reanimated").SharedValue<number>;
    expectHeight: number;
    refHasChanged: (ref: import("react-native-gesture-handler/lib/typescript/handlers/gestures/nativeGesture").NativeGesture) => void;
    curIndexValue: import("react-native-reanimated").SharedValue<number>;
    updateSceneInfo: (e: import("./types").UpdateSceneInfoParams) => void;
    scrollViewPaddingTop: number;
    animatedScrollableState: import("react-native-reanimated").SharedValue<import("./constants").SCROLLABLE_STATE>;
    disableBounces?: import("react-native-reanimated").SharedValue<boolean> | undefined;
};
//# sourceMappingURL=context.d.ts.map