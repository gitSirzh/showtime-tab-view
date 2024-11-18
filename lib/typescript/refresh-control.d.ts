import React from "react";
import { SharedValue } from "react-native-reanimated";
import { RefreshControlProps } from "./types";
type RefreshControlContainerProps = {
    top: number;
    refreshHeight: number;
    overflowPull: number;
    opacityValue: SharedValue<number>;
    refreshValue: SharedValue<number>;
    isRefreshing: SharedValue<boolean>;
    isRefreshingWithAnimation: SharedValue<boolean>;
    pullExtendedCoefficient: number;
    renderContent?: (refreshProps: RefreshControlProps) => React.ReactElement;
    refreshControlColor?: string;
};
declare const RefreshControlContainer: React.FC<RefreshControlContainerProps>;
export default RefreshControlContainer;
//# sourceMappingURL=refresh-control.d.ts.map