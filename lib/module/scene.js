function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming, runOnJS, scrollTo } from "react-native-reanimated";
import { useHeaderTabContext } from "./context";
import { useSharedScrollableRef, useSyncInitialPosition } from "./hooks";
import { SCROLLABLE_STATE } from "./constants";
export function SceneComponent(_ref) {
  let {
    index,
    onScroll: propOnScroll,
    onContentSizeChange,
    ContainerView,
    contentContainerStyle,
    scrollIndicatorInsets,
    forwardedRef,
    useExternalScrollView = false,
    ...restProps
  } = _ref;
  //#region refs
  const nativeGestureRef = useRef(Gesture.Native());
  const scollViewRef = useSharedScrollableRef(forwardedRef);
  //#endregion

  //#region hooks
  const {
    shareAnimatedValue,
    headerHeight,
    expectHeight,
    refHasChanged,
    updateSceneInfo,
    scrollViewPaddingTop,
    animatedScrollableState,
    disableBounces
  } = useHeaderTabContext();
  //#endregion

  //#region animations/style
  const scrollY = useSharedValue(0);
  const {
    opacityValue,
    initialPosition
  } = useSyncInitialPosition(scollViewRef);
  const sceneStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityValue.value)
    };
  }, [opacityValue]);

  //#endregion

  //#region methods
  const onScrollAnimateEvent = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
      if (animatedScrollableState.value === SCROLLABLE_STATE.LOCKED) {
        scrollTo(scollViewRef, 0, 0, false);
      } else {
        shareAnimatedValue.value = e.contentOffset.y;
      }
      if (propOnScroll) {
        runOnJS(propOnScroll)({
          nativeEvent: e
        });
      }
    },
    onBeginDrag: () => {
      if (disableBounces) {
        disableBounces.value = true;
      }
      // console.log("onBeginDrag");
    }
    // onEndDrag: (e) => {
    //   console.log("onEndDrag");
    // },
    // onMomentumEnd: () => {
    //   console.log("onMomentumEnd");
    // },
    // onMomentumBegin: () => {
    //   console.log("onMomentumBegin");
    // },
  });
  // adjust the scene size
  const _onContentSizeChange = useCallback((contentWidth, contentHeight) => {
    onContentSizeChange === null || onContentSizeChange === void 0 ? void 0 : onContentSizeChange(contentWidth, contentHeight);
    if (Math.ceil(contentHeight) >= expectHeight) {
      initialPosition(shareAnimatedValue.value);
    }
  }, [onContentSizeChange, initialPosition, expectHeight, shareAnimatedValue]);
  //#endregion

  useEffect(() => {
    refHasChanged === null || refHasChanged === void 0 ? void 0 : refHasChanged(nativeGestureRef.current);
  }, [refHasChanged]);
  useEffect(() => {
    if (scollViewRef && scollViewRef.current) {
      updateSceneInfo({
        scrollRef: scollViewRef,
        index,
        scrollY
      });
    }
  }, [scollViewRef, index, scrollY, updateSceneInfo]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container, sceneStyle]
  }, /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: nativeGestureRef.current
  }, /*#__PURE__*/React.createElement(ContainerView, _extends({}, restProps, {
    ref: scollViewRef,
    scrollEventThrottle: 16,
    directionalLockEnabled: true,
    contentContainerStyle: [contentContainerStyle, {
      paddingTop: useExternalScrollView ? 0 : scrollViewPaddingTop,
      minHeight: expectHeight
    }],
    onContentSizeChange: _onContentSizeChange,
    onScroll: onScrollAnimateEvent,
    scrollIndicatorInsets: {
      top: headerHeight,
      ...scrollIndicatorInsets
    },
    bounces: false
  }))));
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=scene.js.map